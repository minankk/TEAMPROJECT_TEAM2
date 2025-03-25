// RockPage.js
import React, { useState, useEffect } from 'react';
import './RockPage.css';
import { useNavigate } from 'react-router-dom';

const RockPage = ({ handleAddToCart }) => {
  const [rockAlbums, setRockAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/genres/rock')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRockAlbums(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Rock albums...</p>;
  if (error) return <p>Error loading Rock albums: {error.message}</p>;

  return (
    <div className="rock-page-container">
      <h1>Rock Albums</h1>
      <div className="rock-albums-grid">
        {rockAlbums.map((album) => (
          <div className="rock-album-card" key={album.product_id}>
            <img
              src={`http://localhost:5001${album.cover_image_url}`}
              alt={album.name}
              className="rock-album-image"
            />
            <h2 className="rock-album-name">{album.name}</h2>
            <p className="rock-album-artist">{album.artist_name}</p>
            <p className="rock-album-price">£{album.price}</p>
            <button
              className="add-to-cart-rock"
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

export default RockPage;