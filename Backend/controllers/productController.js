const db = require('../db');
const formatDate = require('../helpers/dateFormatter');
const formatCurrency = require('../helpers/currencyFormatter')
 
exports.getAllProducts = (req, res) => {
  db.execute(`
      SELECT p.product_id, p.name AS album_name, a.name AS artist_name, g.name AS genre_name,
             p.price, p.cover_image_url, p.release_date
      FROM products p
      JOIN artists a ON p.artist_id = a.artist_id
      JOIN genres g ON p.genre_id = g.genre_id
  `)
  .then(([results]) => {
     
      results.forEach(product => {
          product.release_date = formatDate(product.release_date);  
          product.price = formatCurrency(product.price);  
      });
      res.status(200).json(results);  
  }).catch((err) => {
    console.error("Error fetching products:", err);  
    res.status(500).json({ error: "Failed to fetch products" });
});
};


// Controller function to filter products by genre
/*exports.filterByGenre = async (req, res) => {
  const { genre } = req.params;

  try {
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
      WHERE g.genre_name = ?
    `, [genre]);

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error('Error filtering products by genre:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to filter products by decade
exports.filterByDecade = async (req, res) => {
  const { decade } = req.params;
  const startYear = parseInt(decade);
  const endYear = startYear + 9;

  try {
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
      WHERE YEAR(p.release_date) BETWEEN ? AND ?
    `, [startYear, endYear]);

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error('Error filtering products by decade:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to filter best sellers
exports.filterBestSellers = async (req, res) => {
  try {
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
      WHERE p.best_sellers = TRUE
    `);

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error('Error filtering best sellers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to filter products on sale
exports.filterOnSale = async (req, res) => {
  try {
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
      WHERE p.sale = TRUE
    `);

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error('Error filtering products on sale:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to filter products by artist
exports.filterByArtist = async (req, res) => {
  const { artist } = req.params;

  try {
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
      WHERE a.name = ?
    `, [artist]);

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error('Error filtering products by artist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};*/