// PopPage.js
import React, { useState, useEffect } from 'react';
import './PopPage.css';
import { useNavigate } from 'react-router-dom';

const PopPage = ({ handleAddToCart }) => {
  const [popAlbums, setPopAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/genres/pop')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPopAlbums(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Pop albums...</p>;
  if (error) return <p>Error loading Pop albums: {error.message}</p>;

  return (
    <div className="pop-page-container">
      <h1>Pop Albums</h1>
      <div className="pop-albums-grid">
        {popAlbums.map((album) => (
          <div className="pop-album-card" key={album.product_id}>
            <img
              src={`http://localhost:5001${album.cover_image_url}`}
              alt={album.name}
              className="pop-album-image"
            />
            <h2 className="pop-album-name">{album.name}</h2>
            <p className="pop-album-artist">{album.artist_name}</p>
            <p className="pop-album-price">£{album.price}</p>
            <button
              className="add-to-cart-pop"
              onClick={() => handleAddToCart(album.product_id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopPage;