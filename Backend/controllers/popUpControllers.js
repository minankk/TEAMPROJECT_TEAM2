const db = require('../db');

exports.getPopUpInfo = (req, res) => {
  // Get productId from the URL parameter, set a default value if not present
  const productId = req.params.id || 1;  // 例: productIdがない場合はデフォルトで1を設定

  // Helper function to format the date
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Execute the DB query to get product information
  db.execute(
    `SELECT p.product_id, p.name AS album_name, a.name AS artist_name, g.name AS genre_name,
      p.price, p.cover_image_url, p.release_date, ap.hit_singles, ap.awards, ap.records, 
      ap.genres_popup, ap.interesting_facts, ap.related_albums
    FROM products p
    JOIN artists a ON p.artist_id = a.artist_id
    JOIN genres g ON p.genre_id = g.genre_id
    LEFT JOIN albums_pop_up ap ON p.album_id = ap.album_id
    WHERE p.product_id = ?`, 
    [productId] // Pass productId to the SQL query
  )
  .then(([results]) => {
    if (results.length > 0) {
      const product = results[0];
      
      // Format the release date
      product.release_date = formatDate(product.release_date);
      
      // Return the formatted product information as a response
      res.status(200).json({
        album_name: product.album_name,
        release_date: product.release_date,
        hit_singles: product.hit_singles,
        awards: product.awards,
        records: product.records,
        genres_popup: product.genres_popup,
        interesting_facts: product.interesting_facts,
        related_albums: product.related_albums
      });
    } else {
      // If no product is found, return a 404 error
      res.status(404).json({ error: "Product not found" });
    }
  })
  .catch((err) => {
    // If an error occurs, return a 500 error with the error details
    console.error("Error fetching pop-up information:", err);
    res.status(500).json({ error: "Failed to fetch pop-up information", details: err.message });
  });
}; 