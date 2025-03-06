const db = require('../db');
const formatDate = require('../helpers/dateFormatter');
const formatCurrency = require('../helpers/currencyFormatter')
const stringSimilarity = require('string-similarity');

//to view the artist
exports.getArtists = async (req, res) => {
  db.execute(`
    SELECT artist_id, name, bio, profile_image_url
    FROM artists
  `)
  .then(([results]) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    console.error("Error fetching artists:", err);
    res.status(500).json({ error: "Failed to fetch artists" });
  });
};

//to get newest addition
exports.getNewestAdditions = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        p.product_id, 
        p.name AS album_name, 
        a.name AS artist_name, 
        g.name AS genre,
        p.release_date, 
        p.price, 
        p.cover_image_url
      FROM products p
      JOIN artists a ON p.artist_id = a.artist_id
      JOIN genres g ON p.genre_id = g.genre_id
      WHERE p.newest_addition = 1
    `);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No newest additions found." });
    }

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error('Error fetching newest additions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
