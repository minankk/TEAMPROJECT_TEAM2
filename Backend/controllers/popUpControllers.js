const db = require('../db');

/* exports.getPopUpInfo = (req, res) => {
  // Get productId from the URL parameter, set a default value if not present
  const productId = req.params.id || 1;  

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
        cover_image_url: product.cover_image_url, // added
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

exports.getPopUpInfo = (req, res) => {
  // Get productId from the URL parameter, set a default value if not present
  const productId = req.params.id || 1;  

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

      // Parse the related_albums string into an array of album IDs
      let relatedAlbums = [];
      if (product.related_albums) {
        relatedAlbums = product.related_albums.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
      }

      // Function to fetch related album images
      const fetchRelatedAlbumImages = (albumIds) => {
        if (albumIds.length === 0) {
          return Promise.resolve([]);
        }
        return db.execute(
          `SELECT product_id, cover_image_url FROM products WHERE product_id IN (?)`,
          [albumIds]
        )
        .then(([relatedImages]) => relatedImages);
      };

      // Fetch related album images and then send the response
      fetchRelatedAlbumImages(relatedAlbums)
      .then(relatedAlbumImages => {
        // Create a map of product_id to cover_image_url for easy access
        const relatedImagesMap = {};
        relatedAlbumImages.forEach(image => {
          relatedImagesMap[image.product_id] = image.cover_image_url;
        });

        // Add the cover_image_url to each related album in the response
        const relatedAlbumsWithImages = relatedAlbums.map(albumId => ({
          product_id: albumId,
          cover_image_url: relatedImagesMap[albumId] || null, // Add image URL or null if not found
        }));
        
        // Return the formatted product information as a response
        res.status(200).json({
          album_name: product.album_name,
          cover_image_url: product.cover_image_url,
          release_date: product.release_date,
          hit_singles: product.hit_singles,
          awards: product.awards,
          records: product.records,
          genres_popup: product.genres_popup,
          interesting_facts: product.interesting_facts,
          related_albums: relatedAlbumsWithImages, // Use the array with image URLs
        });
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


// controllers/popUpControllers.js
/**
 * Retrieves pop-up information for a product based on its ID.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.

exports.getPopUpInfo = async (req, res) => {
  try {
    // Validate productId
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // Optimized database query: Fetch product and related album information in a single query
    const [results] = await db.execute(
      `SELECT 
        p.product_id, p.name AS album_name, p.cover_image_url, p.release_date,
        ap.hit_singles, ap.awards, ap.records, ap.genres_popup, ap.interesting_facts, ap.related_albums
      FROM products p
      LEFT JOIN albums_pop_up ap ON p.album_id = ap.album_id
      WHERE p.product_id = ?`,
      [productId]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = results[0];

    // Format release date
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    const formattedReleaseDate = formatDate(product.release_date);

    // Shape related album information with image URLs
    let relatedAlbums = [];
    if (product.related_albums) {
      const relatedAlbumIds = product.related_albums.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));

      if (relatedAlbumIds.length > 0) {
        // Fetch related album image URLs
        const [relatedAlbumImages] = await db.execute(
          `SELECT product_id, cover_image_url FROM products WHERE product_id IN (?)`,
          [relatedAlbumIds]
        );

        relatedAlbums = relatedAlbumImages.map(image => ({
          product_id: image.product_id,
          cover_image_url: image.cover_image_url,
        }));
      }
    }

    // Send response
    res.status(200).json({
      album_name: product.album_name,
      cover_image_url: product.cover_image_url,
      release_date: formattedReleaseDate,
      hit_singles: product.hit_singles,
      awards: product.awards,
      records: product.records,
      genres_popup: product.genres_popup,
      interesting_facts: product.interesting_facts,
      related_albums: relatedAlbums,
    });
  } catch (err) {
    console.error("Error fetching pop-up information:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
 

// controllers/popUpControllers.js

exports.getPopUpInfo = async (req, res) => {
  try {
    // Validate productId
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // Optimized database query: Fetch product and related album information in a single query
    const [results] = await db.execute(
      `SELECT 
        p.product_id, p.name AS album_name, p.cover_image_url, p.release_date,
        ap.hit_singles, ap.awards, ap.records, ap.genres_popup, ap.interesting_facts, ap.related_albums
      FROM products p
      LEFT JOIN albums_pop_up ap ON p.album_id = ap.album_id
      WHERE p.product_id = ?`,
      [productId]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = results[0];

    // Format release date
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    const formattedReleaseDate = formatDate(product.release_date);

    // Fetch related album information with image URLs
    let relatedAlbums = [];
    if (product.related_albums) {
      const relatedAlbumIds = product.related_albums.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));

      if (relatedAlbumIds.length > 0) {
        // Fetch related album image URLs from the new table
        const [relatedAlbumImages] = await db.execute(
          `SELECT related_album_id, image_url FROM related_albums_images WHERE album_id = ? AND related_album_id IN (?)`,
          [productId, relatedAlbumIds]
        );

        relatedAlbums = relatedAlbumImages.map(image => ({
          product_id: image.related_album_id,
          cover_image_url: image.image_url,
        }));
      }
    }

    // Send response
    res.status(200).json({
      album_name: product.album_name,
      cover_image_url: product.cover_image_url,
      release_date: formattedReleaseDate,
      hit_singles: product.hit_singles,
      awards: product.awards,
      records: product.records,
      genres_popup: product.genres_popup,
      interesting_facts: product.interesting_facts,
      related_albums: {
        text: product.related_albums ? `If you loved ${product.album_name}, you might also like: ${product.related_albums}` : null,
        images: relatedAlbums,
      },
    });
  } catch (err) {
    console.error("Error fetching pop-up information:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};　*/

exports.getPopUpInfo = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // Query to fetch album details and related albums with their images
    const [results] = await db.execute(`
      SELECT 
        p.product_id, 
        p.name AS album_name, 
        p.cover_image_url, 
        p.release_date,
        ap.hit_singles, 
        ap.awards, 
        ap.records, 
        ap.genres_popup, 
        ap.interesting_facts, 
        ra.related_album_id, 
        a.title AS related_album_name,  -- Fetch title from the albums table
        rai.image_url AS related_album_image  -- Related album image URL
      FROM products p
      LEFT JOIN albums_pop_up ap ON p.album_id = ap.album_id
      LEFT JOIN related_albums ra ON ap.album_id = ra.album_id
      LEFT JOIN albums a ON ra.related_album_id = a.album_id  -- Join to albums table for related albums
      LEFT JOIN related_album_images rai ON ra.related_album_id = rai.related_album_id
      WHERE p.product_id = ?;
    `, [productId]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = results[0];
    const formattedReleaseDate = new Date(product.release_date).toISOString().split('T')[0];

    // Collect related albums with their images
    const relatedAlbums = results.map(item => ({
      related_album_id: item.related_album_id,
      related_album_name: item.related_album_name,
      related_album_image: item.related_album_image,
    }));

    // Clean up and remove duplicates for related albums
    const uniqueRelatedAlbums = Array.from(new Map(relatedAlbums.map(item => [item.related_album_id, item])).values());

    // Return the product details along with related albums and images
    res.status(200).json({
      album_name: product.album_name,
      cover_image_url: product.cover_image_url,
      release_date: formattedReleaseDate,
      hit_singles: product.hit_singles,
      awards: product.awards,
      records: product.records,
      genres_popup: product.genres_popup,
      interesting_facts: product.interesting_facts,
      related_albums: uniqueRelatedAlbums,  // Send only unique related albums
    });
  } catch (err) {
    console.error("Error fetching pop-up information:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
