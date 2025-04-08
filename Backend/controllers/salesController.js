const db = require('../db');
const formatCurrency = require('../helpers/currencyFormatter');

exports.getSalesProducts = async (req, res) => {
  db.execute(`
    SELECT p.product_id, p.name, p.artist_id, p.album_id, p.genre_id, p.price, p.cover_image_url, 
           a.name AS artist_name, al.title AS album_title
    FROM products p
    JOIN artists a ON p.artist_id = a.artist_id
    JOIN albums al ON p.album_id = al.album_id
    JOIN genres g ON p.genre_id = g.genre_id
    WHERE p.on_sale = 1
  `)
  .then(([results]) => {
    results.forEach(product => {
      product.price = formatCurrency(product.price);
    });
    res.status(200).json(results);
  })
  .catch((err) => {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  });
};

