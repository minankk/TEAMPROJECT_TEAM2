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
        const [artist] = await db.execute(`
            SELECT a.artist_id, a.name, ab.bio, ab.image_url
            FROM artists a
            LEFT JOIN artists_bio ab ON a.artist_id = ab.artist_id
            WHERE a.artist_id = ?
        `, [artistId]);

        if (artist.length === 0) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.status(200).json(artist[0]);
    } catch (error) {
        console.error('Error fetching artist:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};