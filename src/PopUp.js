// PopUp.js
import React from 'react';
import './PopUp.css';

const PopUp = ({ product, onClose, onAddToCart }) => {

  if (!product) {
    console.error("PopUp: Product prop is missing or invalid.");
    return null;
  }

  const handleAddToCartClick = (event) => {
    event.stopPropagation();
    if (onAddToCart) {
      if (product && product.product_id) {
        onAddToCart(product.product_id);
      } else {
        console.error("PopUp: product_id is missing or invalid.");
      }
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="popup-close" id="btn" onClick={onClose}>
          &times;
        </button>
        <h2>{product.album_name}</h2>
        {product.cover_image_url ? (
          <img
            src={product.cover_image_url}
            alt={product.album_name}
            className="popup-image"
            onError={() => console.error("PopUp: Image failed to load:", product.cover_image_url)}
          />
        ) : (
          <p>Image not available.</p>
        )}
        <p>Release Date: {product.release_date}</p>
        <p>Hit Singles: {product.hit_singles}</p>
        <p>Awards: {product.awards}</p>
        <p>Records: {product.records}</p>
        <p>Genres: {product.genres_popup}</p>
        <p>Interesting Facts: {product.interesting_facts}</p>
        <p>Related Albums: {product.related_albums}</p>

        <button className="add-to-cart-popup" onClick={handleAddToCartClick}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PopUp;