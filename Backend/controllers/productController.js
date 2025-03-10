const db = require('../db');
const formatDate = require('../helpers/dateFormatter');
const formatCurrency = require('../helpers/currencyFormatter');

exports.getAllProducts = (req, res) => {
  db.execute(`
      SELECT p.product_id, p.name AS album_name, a.name AS artist_name, g.name AS genre_name,
             p.price, p.cover_image_url
      FROM products p
      JOIN artists a ON p.artist_id = a.artist_id
      JOIN genres g ON p.genre_id = g.genre_id
  `)
  .then(([results]) => {
     
      results.forEach(product => {
          product.price = formatCurrency(product.price);  
      });
      res.status(200).json(results);  
  }).catch((err) => {
    console.error("Error fetching products:", err);  
    res.status(500).json({ error: "Failed to fetch products" });
});
};

// Function to get a single product by ID
exports.getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const [rows] = await db.execute(`
      SELECT 
        p.product_id, 
        p.name AS album_name, 
        a.name AS artist_name, 
        g.name AS genre,
        p.price, 
        p.cover_image_url
      FROM products p
      JOIN artists a ON p.artist_id = a.artist_id
      JOIN genres g ON p.genre_id = g.genre_id
      WHERE p.product_id = ?
    `, [productId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: `Product with ID ${productId} not found.` });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to filter products by genre
exports.filterByGenre = async (req, res) => {
    const { genre } = req.params;

    try {
        const [rows] = await db.execute(
            `
            SELECT 
                p.product_id, 
                p.name AS product_name, 
                a.name AS artist_name, 
                g.name AS genre,
                p.release_date, 
                p.price, 
                p.cover_image_url, 
                p.type, 
                p.best_sellers, 
                p.sale
            FROM products p
            JOIN artists a ON p.artist_id = a.artist_id
            JOIN genres g ON p.genre_id = g.genre_id
            WHERE g.name = ?
        `,
            [genre]
        );

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
        p.name, 
        a.name AS artist_name, 
        g.name AS genre,
        p.price, 
        p.cover_image_url
      FROM products p
      JOIN artists a ON p.artist_id = a.artist_id
      JOIN genres g ON p.genre_id = g.genre_id
      WHERE YEAR(p.release_date) BETWEEN ? AND ?
    `, [startYear, endYear]);
    if (rows.length === 0) {
      return res.status(404).json({ message: `No products found for the ${startYear}s.` });
    }

        res.status(200).json({ products: rows });
    } catch (error) {
        console.error('Error filtering products by decade:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//Controller function to filter products by price
exports.filterByPrice = async (req, res) => {
  const { price } = req.params; 
  const priceValue = parseInt(price, 10);
  try {
    const [rows] = await db.execute(`
      SELECT 
        p.product_id, 
        p.name AS album_name, 
        a.name AS artist_name, 
        g.name AS genre,
        p.price, 
        p.cover_image_url
      FROM products p
      JOIN artists a ON p.artist_id = a.artist_id
      JOIN genres g ON p.genre_id = g.genre_id
      WHERE p.price = ?
    `, [priceValue]);

    if (rows.length === 0) {
      return res.status(404).json({ message: `No products found at price £${priceValue}.` });
    }

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error('Error filtering products by price:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Controller function to filter products by best sellers
exports.filterBestSellers = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        p.product_id, 
        p.name AS album_name, 
        a.name AS artist_name, 
        g.name AS genre,
        p.price, 
        p.cover_image_url
      FROM products p
      JOIN artists a ON p.artist_id = a.artist_id
      JOIN genres g ON p.genre_id = g.genre_id
      WHERE p.best_sellers = 1
    `);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No best-selling products found." });
    }

        res.status(200).json({ products: rows });
    } catch (error) {
        console.error('Error filtering best sellers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//Controller function to filter products by on-sale
exports.filterOnSale = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        p.product_id, 
        p.name AS album_name, 
        a.name AS artist_name, 
        g.name AS genre,
        p.price, 
        p.cover_image_url
      FROM products p
      JOIN artists a ON p.artist_id = a.artist_id
      JOIN genres g ON p.genre_id = g.genre_id
      WHERE p.on_sale = 1
    `);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No products found on sale." });
    }

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error('Error filtering on-sale products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Controller function to filter products by genre
exports.filterByGenre = async (req, res) => {
  const { genre } = req.params;

  try {
    const [rows] = await db.execute(`
      SELECT 
        p.product_id, 
        p.name, 
        a.name AS artist_name, 
        g.name AS genre,
        p.price, 
        p.cover_image_url 
      FROM products p
      JOIN artists a ON p.artist_id = a.artist_id
      JOIN genres g ON p.genre_id = g.genre_id
      WHERE g.name = ?
    `, [genre]);

    if (rows.length === 0) {
      return res.status(404).json({ message: `No products found for genre: ${genre}` });
    }
    res.status(200).json({ products: rows });
  } catch (error) {
    console.error('Error filtering products by genre:', error);
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
        p.name, 
        a.name AS artist_name, 
        g.name AS genre,
        p.price, 
        p.cover_image_url
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
};