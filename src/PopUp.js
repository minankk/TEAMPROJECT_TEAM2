// PopUp.js
import React, { useState } from 'react';
import './PopUp.css';

const PopUp = ({ product, onClose, onAddToCart }) => {
  const [showFullDetails, setShowFullDetails] = useState(false);

  if (!product) return null;

  const toggleDetails = () => {
    setShowFullDetails(!showFullDetails);
  };

  const popupHeight = showFullDetails ? 'auto' : '300px';

  const handleAddToCartClick = (event) => {
    event.stopPropagation(); // Prevent popup from closing
    if (onAddToCart) {
      onAddToCart(product.product_id); // Pass product ID to parent
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup" style={{ height: popupHeight }}>
        <button className="popup-close" id="btn" onClick={onClose}>
          &times;
        </button>
        <h2>{product.album_name}</h2>
        <p>Release Date: {product.release_date}</p>
        <p>Hit Singles: {product.hit_singles}</p>
        {showFullDetails && (
          <>
            <p>Awards: {product.awards}</p>
            <p>Records: {product.records}</p>
            <p>Genres: {product.genres_popup}</p>
            <p>Interesting Facts: {product.interesting_facts}</p>
            <p>Related Albums: {product.related_albums}</p>
          </>
        )}
        <button className="read-more-button" onClick={toggleDetails}>
          {showFullDetails ? 'Read Less' : 'Read More'}
        </button>
        <button className="add-to-cart-popup" onClick={handleAddToCartClick}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PopUp;