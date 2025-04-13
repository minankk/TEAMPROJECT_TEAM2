// PopUp.js
import React, { useState, useEffect } from "react";
import "./PopUp.css";

const PopUp = ({ product, onClose, onAddToCart }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const [reviews, setReviews] = useState([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0); 
  

  if (!product) return null;

  const handleAddToCartClick = (event) => {
    event.stopPropagation();
    if (onAddToCart && product.product_id) {
      onAddToCart(product.product_id);
    }
  };


  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewName.trim() && reviewText.trim() && rating > 0) {
      setReviews([...reviews, { name: reviewName, text: reviewText, rating }]);
      setReviewName("");
      setReviewText("");
      setRating(0);
    }
  };
  


  return (
    <div className="popup-overlay" style={{ paddingTop: '60px', paddingBottom: '40px' }}>
      <div className="product-popup small">
        <button className="product-popup-close" onClick={onClose}>
          &times;
        </button>

        <div className="product-popup-content">
        <h2>{product.album_name}</h2>

        {product.cover_image_url ? (
          <img
            src={`http://localhost:5001${product.cover_image_url}`}
            alt={product.album_name}
            className="product-popup-image"
            onError={(e) => (e.target.src = "/path_to_default_image.jpg")}
          />
        ) : (
          <p>Image not available.</p>
        )}

        <p><strong>Release Date:</strong> {product.release_date || "Not available"}</p>
        <p><strong>Hit Singles:</strong> {product.hit_singles || "Not available"}</p>

        {['awards', 'records', 'genres_popup', 'interesting_facts'].map((key) => (
          <p key={key}>
            <strong>{key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong> {product[key] || "Not available"}
          </p>
        ))}

        <div>
          <h3>Related Albums:</h3>
          {product.related_albums?.length ? (
            <div className="related-albums">
              {product.related_albums.map((album, index) => (
                <div key={index} className="related-album">
                  <p>{album.related_album_name}</p>
                  <img
                    src={`http://localhost:5001${album.related_album_image || "/path_to_default_image.jpg"}`}
                    alt={album.related_album_name}
                    className="related-album-image"
                    onError={(e) => (e.target.src = "/path_to_default_image.jpg")}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No related albums available.</p>
          )}
        </div>

        <div className="popup-reviews-section">
        <h3>User Reviews</h3>

{reviews.length > 0 ? (
  <ul className="review-list">
    {reviews.map((review, index) => (
      <li key={index}>
        <strong>{review.name}:</strong> {review.text}
        <div className="stars-display">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < review.rating ? "⭐" : "☆"}</span>
          ))}
        </div>
      </li>
    ))}
  </ul>
) : (
  <p>No reviews yet. Be the first!</p>
)}

<form onSubmit={handleReviewSubmit} className="review-form">
  <input
    type="text"
    placeholder="Your name"
    value={reviewName}
    onChange={(e) => setReviewName(e.target.value)}
    required
  />
  <textarea
    placeholder="Write your review..."
    value={reviewText}
    onChange={(e) => setReviewText(e.target.value)}
    required
  />

<h3>
  ⭐ Leave Your Rating{" "}
  <span style={{ fontStyle: 'italic', fontWeight: 'normal', fontSize: '0.85rem', color: '#888' }}>
    (Tap the stars!)
  </span>
</h3>

<div className="rating-stars" style={{ marginBottom: '10px' }}>
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      onClick={() => setRating(star)}
      style={{
        cursor: "pointer",
        fontSize: "1.6rem",
        color: star <= rating ? "#ffc107" : "#ccc",
        transition: "color 0.2s",
        padding: "0 4px"
      }}
    >
      ★
    </span>
  ))}
</div>

  <button type="submit">Submit Review</button>
</form>
</div>
</div>

<div className="product-popup-footer">
    <button className="add-to-cart-popup" onClick={handleAddToCartClick}>
      Add to Cart
    </button>
  </div>
  </div>
  </div>

  );
};

export default PopUp;
