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

  if (!product) return null;

  const handleAddToCartClick = (event) => {
    event.stopPropagation();
    if (onAddToCart && product.product_id) {
      onAddToCart(product.product_id);
    }
  };

  return (
    <div className="popup-overlay" style={{ paddingTop: '60px', paddingBottom: '40px' }}>
      <div className="popup small">
        <button className="popup-close" onClick={onClose}>
          &times;
        </button>

        <h2>{product.album_name}</h2>

        {product.cover_image_url ? (
          <img
            src={`http://localhost:5001${product.cover_image_url}`}
            alt={product.album_name}
            className="popup-image"
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

        <button className="add-to-cart-popup" onClick={handleAddToCartClick}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PopUp;
