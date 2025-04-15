const db = require('../db');


const normalizeImagePath = (path) => {
    if (!path) return null;
    return '/' + path
        .replace(/\\/g, '/')
        .replace(/^Backend\/public\//, '');
};



exports.getAllArtists = async (req, res) => {
    try {
        const [artists] = await db.execute(`
            SELECT a.artist_id, a.name, ab.bio, ab.image_url
            FROM artists a
            LEFT JOIN artists_bio ab ON a.artist_id = ab.artist_id
        `);

        const updatedArtists = artists.map(artist => ({
            ...artist,
            image_url: normalizeImagePath(artist.image_url)
        }));

        res.status(200).json(updatedArtists);
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
            image_url: normalizeImagePath(artistDetails[0].image_url),
            products: artistProducts
        };

        res.status(200).json(artist);

    } catch (error) {
        console.error('Error fetching artist with products:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
