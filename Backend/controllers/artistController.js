const db = require('../db');

exports.getAllArtists = async (req, res) => {
    try {
        const [artists] = await db.execute(`
            SELECT a.artist_id, a.name, ab.bio, ab.image_url
            FROM artists a
            LEFT JOIN artists_bio ab ON a.artist_id = ab.artist_id
        `);
        res.status(200).json(artists);
    } catch (error) {
        console.error('Error fetching artists:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.getArtistById = async (req, res) => {
    try {
        const artistId = req.params.artistId;

        const [artistDetails] = await db.execute(`
            SELECT a.artist_id, a.name, ab.bio, ab.image_url
            FROM artists a
            LEFT JOIN artists_bio ab ON a.artist_id = ab.artist_id
            WHERE a.artist_id = ?
        `, [artistId]);

        if (artistDetails.length === 0) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        const [artistProducts] = await db.execute(`
            SELECT p.product_id, p.name, p.price, p.cover_image_url
            FROM products p
            WHERE p.artist_id = ?
        `, [artistId]);

        const artist = {
            ...artistDetails[0],
            products: artistProducts
        };

        res.status(200).json(artist);

    } catch (error) {
        console.error('Error fetching artist with products:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// UNIT TESTS
if (process.env.NODE_ENV === 'test') {
    const { getAllArtists, getArtistById } = module.exports;

    const mockRes = () => ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    });

    describe('Artist Controller', () => {
        afterEach(() => jest.clearAllMocks());

        test('getAllArtists - returns artists list', async () => {
            const req = {};
            const res = mockRes();

            db.execute = jest.fn().mockResolvedValueOnce([[{ artist_id: 1, name: 'Nirvana' }]]);

            await getAllArtists(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.any(Array));
        });

        test('getArtistById - returns artist with products', async () => {
            const req = { params: { artistId: 1 } };
            const res = mockRes();

            db.execute = jest
                .fn()
                .mockResolvedValueOnce([[{ artist_id: 1, name: 'Nirvana' }]])
                .mockResolvedValueOnce([[{ product_id: 1, name: 'Nevermind' }]]);

            await getArtistById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({ artist_id: 1, products: expect.any(Array) })
            );
        });

        test('getArtistById - artist not found', async () => {
            const req = { params: { artistId: 999 } };
            const res = mockRes();

            db.execute = jest.fn().mockResolvedValueOnce([[]]);

            await getArtistById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Artist not found' });
        });
    });
}