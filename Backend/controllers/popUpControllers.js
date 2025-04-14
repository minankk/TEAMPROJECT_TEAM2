const db = require('../db');

exports.getPopUpInfo = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const [results] = await db.execute(`
      SELECT 
  p.product_id, 
  p.name AS album_name, 
  p.cover_image_url, 
  p.release_date,
  p.price,
  ar.name AS artist_name,                            -- ✅ artist name from proper join
  ap.hit_singles, 
  ap.awards, 
  ap.records, 
  ap.genres_popup, 
  ap.interesting_facts, 
  ra.related_album_id, 
  rel_albums.title AS related_album_name, 
  rai.image_url AS related_album_image
  FROM products p
  LEFT JOIN albums main_albums ON p.album_id = main_albums.album_id     
  LEFT JOIN artists ar ON main_albums.artist_id = ar.artist_id         
  LEFT JOIN albums_pop_up ap ON p.album_id = ap.album_id
  LEFT JOIN related_albums ra ON ap.album_id = ra.album_id
  LEFT JOIN albums rel_albums ON ra.related_album_id = rel_albums.album_id
  LEFT JOIN related_album_images rai ON ra.related_album_id = rai.related_album_id
  WHERE p.product_id = ?;
    `, [productId]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = results[0];
    const formattedReleaseDate = new Date(product.release_date).toISOString().split('T')[0];

    const relatedAlbums = results.map(item => ({
      related_album_id: item.related_album_id,
      related_album_name: item.related_album_name,
      related_album_image: item.related_album_image,
    }));

    const uniqueRelatedAlbums = Array.from(new Map(relatedAlbums.map(item => [item.related_album_id, item])).values());

    res.status(200).json({
      album_name: product.album_name,
      cover_image_url: product.cover_image_url,
      artist_name: product.artist_name, 
      release_date: formattedReleaseDate,
      hit_singles: product.hit_singles,
      awards: product.awards,
      records: product.records,
      price: product.price,  
      genres_popup: product.genres_popup,
      interesting_facts: product.interesting_facts,
      related_albums: uniqueRelatedAlbums,  
    });
  } catch (err) {
    console.error("Error fetching pop-up information:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
