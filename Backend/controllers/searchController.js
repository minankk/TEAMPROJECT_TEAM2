const db = require('../db');
const formatDate = require('../helpers/dateFormatter');
const formatCurrency = require('../helpers/currencyFormatter')
const stringSimilarity = require('string-similarity');

exports.searchProducts = (req, res) => {
    const { query = "" } = req.query;
  
    if (!query) {
      return res.status(400).json({ error: "Search is required" });
    }
  
    const searchWord = `%${query}%`;
  
    //This query is used to find out the exact match
    db.execute(`
        SELECT p.product_id, p.name AS album_name, a.name AS artist_name, g.name AS genre_name,
               p.price, p.cover_image_url
        FROM products p
        JOIN artists a ON p.artist_id = a.artist_id
        JOIN genres g ON p.genre_id = g.genre_id
        WHERE p.name LIKE ? OR a.name LIKE ? OR g.name LIKE ?
    `, [searchWord, searchWord, searchWord])
    .then(([results]) => {
      if (results.length > 0) {
        // If exact matches are found, format them and return
        results.forEach(product => {
          product.price = formatCurrency(product.price);
        });
        return res.status(200).json({ products: results });
      } 
  
      // If no results found, try to find the closest matching product names
      else {
        db.execute(`
            SELECT p.name AS album_name
            FROM products p
        `)
        .then(([allProducts]) => {
          const productNames = allProducts.map(p => p.album_name);
  
          // Use fuzzy matching to find best suggestions using string similarity library
          const matches = stringSimilarity.findBestMatch(query, productNames);
          const suggestions = matches.ratings
            .filter(match => match.rating > 0.4)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3)
          if (suggestions.length > 0) {
            return res.status(200).json({
              message: `No exact matches found for "${query}". Did you mean one of these?`,
              suggestions: suggestions.map(s => s.target)
            });
          } else {
            return res.status(200).json({
              message: `No items found for "${query}". Please try a different product.`
            });
          }
        })
        .catch((err) => {
          console.error("Error fetching suggestions:", err);
          res.status(500).json({ error: "Failed to search products" });
        });
      }
    })
    .catch((err) => {
      console.error("Error searching products:", err);
      res.status(500).json({ error: "Failed to search products" });
    });
  };