import React, { useState } from "react";
import "./PopUp.css";

const PopUp = ({ product, onClose, onAddToCart }) => {
  const [isExpanded, setIsExpanded] = useState({
    awards: false,
    records: false,
    genres: false,
    interesting_facts: false,
  });

  const handleReadMoreClick = (section) => {
    setIsExpanded((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  if (!product) {
    console.error("PopUp: Product prop is missing or invalid.");
    return null;
  }

  const handleAddToCartClick = (event) => {
    event.stopPropagation();
    if (onAddToCart && product.product_id) {
      onAddToCart(product.product_id);
    } else {
      console.error("PopUp: product_id is missing or invalid.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="popup-close" onClick={onClose}>
          &times;
        </button>

        <h2>{product.album_name}</h2>

        {product.cover_image_url ? (
          <img
            src={`http://localhost:5001${product.cover_image_url}`}
            alt={product.album_name}
            className="popup-image"
            onError={(e) => {
              e.target.src = "/path_to_default_image.jpg"; // Fallback image
              console.error("PopUp: Image failed to load:", product.cover_image_url);
            }}
          />
        ) : (
          <p>Image not available.</p>
        )}

        <p><strong>Release Date:</strong> {product.release_date || "Not available"}</p>
        <p><strong>Hit Singles:</strong> {product.hit_singles || "Not available"}</p>

        {/* Display Awards with Read More */}
        {product.awards && (
          <p
            className={isExpanded.awards ? "expanded" : ""}
            onClick={() => handleReadMoreClick("awards")}
          >
            <strong>Awards:</strong> {product.awards}
            {product.awards.length > 50 && ( // Example: Show "Read More" if awards are longer
              <span className="read-more-link">
                {isExpanded.awards ? " (Show Less)" : " (Read More)"}
              </span>
            )}
          </p>
        )}
        {!product.awards && <p><strong>Awards:</strong> Not available</p>}

        {/* Display Records with Read More */}
        {product.records && (
          <p
            className={isExpanded.records ? "expanded" : ""}
            onClick={() => handleReadMoreClick("records")}
          >
            <strong>Records:</strong> {product.records}
            {product.records.length > 50 && ( // Example: Show "Read More" if records are longer
              <span className="read-more-link">
                {isExpanded.records ? " (Show Less)" : " (Read More)"}
              </span>
            )}
          </p>
        )}
        {!product.records && <p><strong>Records:</strong> Not available</p>}

        {/* Display Genres with Read More */}
        {product.genres_popup && (
          <p
            className={isExpanded.genres ? "expanded" : ""}
            onClick={() => handleReadMoreClick("genres")}
          >
            <strong>Genres:</strong> {product.genres_popup}
            {product.genres_popup.length > 50 && ( // Example: Show "Read More" if genres are longer
              <span className="read-more-link">
                {isExpanded.genres ? " (Show Less)" : " (Read More)"}
              </span>
            )}
          </p>
        )}
        {!product.genres_popup && <p><strong>Genres:</strong> Not available</p>}

        {/* Display Interesting Facts with Read More */}
        {product.interesting_facts && (
          <p
            className={isExpanded.interesting_facts ? "expanded" : ""}
            onClick={() => handleReadMoreClick("interesting_facts")}
          >
            <strong>Interesting Facts:</strong> {product.interesting_facts}
            {product.interesting_facts.length > 50 && ( // Example: Show "Read More" if facts are longer
              <span className="read-more-link">
                {isExpanded.interesting_facts ? " (Show Less)" : " (Read More)"}
              </span>
            )}
          </p>
        )}
        {!product.interesting_facts && <p><strong>Interesting Facts:</strong> Not available</p>}

        <div>
          <h3>Related Albums:</h3>
          {product.related_albums && product.related_albums.length > 0 ? (
            <div className="related-albums">
              {product.related_albums.map((album, index) => (
                <div key={index} className="related-album">
                  <p>{album.related_album_name}</p>
                  <img
                    src={`http://localhost:5001${album.related_album_image || "/path_to_default_image.jpg"}`}
                    alt={album.related_album_name}
                    className="related-album-image"
                    onError={(e) => {
                      e.target.src = "/path_to_default_image.jpg"; // Fallback image
                      console.error("PopUp: Image failed to load:", album.related_album_image);
                    }}
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