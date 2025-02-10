// controllers/productsController.js
const db = require('../db'); // Adjust the path if needed

// Controller function to get all products
exports.getProducts = async (req, res) => {
  try {
    // Query: join the products table with artists and genres (if needed)
    const [rows] = await db.execute(`
      SELECT 
        p.product_id, 
        p.product_name, 
        a.name AS artist_name, 
        g.genre_name AS genre,
        p.release_date, 
        p.price, 
        p.cover_image_url, 
        p.type, 
        p.best_sellers, 
        p.sale
      FROM products p
      JOIN artists a ON p.artist_id = a.artist_id
      JOIN genres g ON p.genre_id = g.genre_id
    `);

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
