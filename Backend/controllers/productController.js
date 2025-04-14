const db = require('../db');
const formatDate = require('../helpers/dateFormatter');
const formatCurrency = require('../helpers/currencyFormatter');


const LOW_STOCK_THRESHOLD = 5;

exports.getAllProducts = (req, res) => {
  const query = `
    SELECT 
      p.product_id, 
      p.name AS album_name, 
      a.name AS artist_name, 
      g.name AS genre_name,
      p.price, 
      p.cover_image_url,
      inv.stock_quantity,
      CASE 
        WHEN inv.stock_quantity <= ? THEN TRUE 
        ELSE FALSE 
      END AS low_stock
    FROM products p
    JOIN artists a ON p.artist_id = a.artist_id
    JOIN genres g ON p.genre_id = g.genre_id
    LEFT JOIN (
      SELECT i1.product_id, i1.stock_quantity
      FROM inventory i1
      INNER JOIN (
          SELECT product_id, MAX(inventory_id) AS max_inv_id
          FROM inventory
          GROUP BY product_id
      ) i2 ON i1.product_id = i2.product_id AND i1.inventory_id = i2.max_inv_id
    ) AS inv ON p.product_id = inv.product_id
  `;

  db.execute(query, [5])
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




exports.getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const [rows] = await db.execute(`
      SELECT p.product_id, p.name AS album_name, a.name AS artist_name, g.name AS genre,
             p.price, p.cover_image_url
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

exports.filterByDecade = async (req, res) => {
  const { decade } = req.params;
  const { genre } = req.query;
  const startYear = parseInt(decade);
  const endYear = startYear + 9;

  try {
    let query = `
        SELECT p.product_id, p.name, a.name AS artist_name, g.name AS genre,
               p.price, p.cover_image_url
        FROM products p
        JOIN artists a ON p.artist_id = a.artist_id
        JOIN genres g ON p.genre_id = g.genre_id
        WHERE YEAR(p.release_date) BETWEEN ? AND ?
    `;
    let queryParams = [startYear, endYear];

    if (genre && genre !== 'all') {
      query += ` AND g.name = ?`;
      queryParams.push(genre);
    }

    const [rows] = await db.execute(query, queryParams);

    if (rows.length === 0) {
      return res.status(404).json({ message: `No products found for the ${startYear}s with the selected genre.` });
    }

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error('Error filtering products by decade and genre:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.filterByPrice = async (req, res) => {
  const { price } = req.params;
  const priceValue = parseInt(price, 10);
  try {
    const [rows] = await db.execute(`
      SELECT p.product_id, p.name AS album_name, a.name AS artist_name, g.name AS genre,
             p.price, p.cover_image_url
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

exports.filterBestSellers = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT p.product_id, p.name AS album_name, a.name AS artist_name, g.name AS genre,
             p.price, p.cover_image_url
      FROM products p
      JOIN artists a ON p.artist_id = a.artist_id
      JOIN genres g ON p.genre_id = g.genre_id
      WHERE p.best_sellers = 1
    `);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No best-selling products found." });
    }
    rows.forEach(product => {
      product.price = formatCurrency(product.price);
    });

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error('Error filtering best sellers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.filterOnSale = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT p.product_id, p.name AS album_name, a.name AS artist_name, g.name AS genre,
             p.price, p.cover_image_url
      FROM products p
      JOIN artists a ON p.artist_id = a.artist_id
      JOIN genres g ON p.genre_id = g.genre_id
      WHERE p.on_sale = 1
    `);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No products found on sale." });
    }
    rows.forEach(product => {
      product.price = formatCurrency(product.price);
    });

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error('Error filtering on-sale products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.filterByGenre = async (req, res) => {
  const { genre } = req.params;
  try {
    const [rows] = await db.execute(`
      SELECT p.product_id, p.name, a.name AS artist_name, g.name AS genre,
             p.price, p.cover_image_url
      FROM products p
      JOIN artists a ON p.artist_id = a.artist_id
      JOIN genres g ON p.genre_id = g.genre_id
      WHERE g.name = ?
    `, [genre]);

    if (rows.length === 0) {
      return res.status(404).json({ message: `No products found for genre: ${genre}` });
    }
    rows.forEach(product => {
      product.price = formatCurrency(product.price);
    });

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error('Error filtering products by genre:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.filterByArtist = async (req, res) => {
  const { artist } = req.params;
  try {
    const [rows] = await db.execute(`
      SELECT p.product_id, p.name, a.name AS artist_name, g.name AS genre,
             p.price, p.cover_image_url
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

exports.multipleFliteredProducts = async (req, res) => {
  const { genre, artist, decade } = req.query;
  const startYear = decade ? parseInt(decade) : null;
  const endYear = startYear ? startYear + 9 : null;

  let query = `
    SELECT p.product_id, p.name, a.name AS artist_name, g.name AS genre,
           p.price, p.cover_image_url
    FROM products p
    JOIN artists a ON p.artist_id = a.artist_id
    JOIN genres g ON p.genre_id = g.genre_id
  `;

  let queryParams = [];

  if (genre && genre !== 'all') {
    query += ` WHERE g.name = ?`;
    queryParams.push(genre);
  }

  if (artist) {
    query += queryParams.length > 0 ? ` AND a.name = ?` : ` WHERE a.name = ?`;
    queryParams.push(artist);
  }

  if (decade) {
    query += queryParams.length > 0 ? ` AND YEAR(p.release_date) BETWEEN ? AND ?` : ` WHERE YEAR(p.release_date) BETWEEN ? AND ?`;
    queryParams.push(startYear, endYear);
  }

  try {
    const [rows] = await db.execute(query, queryParams);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No products found with the selected filters." });
    }

    rows.forEach(product => {
      product.price = formatCurrency(product.price);
    });

    res.status(200).json({ products: rows });
  } catch (error) {
    console.error('Error filtering products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

