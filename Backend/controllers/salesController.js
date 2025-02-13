// controllers/salesController.js
const db = require('../db'); 

exports.getSalesProducts = async (req, res) => {
  try {
    // The query joins products, artists, and albums and filters on the album titles for the sales category.
    const query = `
      SELECT p.*, a.name AS artist_name, al.title AS album_title
      FROM products p
      JOIN artists a ON p.artist_id = a.artist_id
      JOIN albums al ON p.album_id = al.album_id
      WHERE al.title IN (
        'Nevermind',
        'The Masterplan',
        'OK Computer',
        'Short n’ Sweet',
        'Abbey Road',
        'Ready to Die'
      )
    `;
    const [rows] = await db.execute(query);
    
    //res.render('sales', { products: rows });
    res.json({ products: rows });
    // res.json({ products: rows });
    
  } catch (err) {
    console.error("Error fetching sales products:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
