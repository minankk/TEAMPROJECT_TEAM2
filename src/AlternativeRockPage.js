// AlternativeRockPage.js
import React, { useState, useEffect } from 'react';
import './AlternativeRockPage.css';
import { useNavigate } from 'react-router-dom';

const AlternativeRockPage = ({ handleAddToCart }) => {
  const [alternativeRockAlbums, setAlternativeRockAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/genres/alternative-rock')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAlternativeRockAlbums(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Alternative Rock albums...</p>;
  if (error) return <p>Error loading Alternative Rock albums: {error.message}</p>;

  return (
    <div className="alternative-rock-page-container">
      <h1>Alternative Rock Albums</h1>
      <div className="alternative-rock-albums-grid">
        {alternativeRockAlbums.map((album) => (
          <div className="alternative-rock-album-card" key={album.product_id}>
            <img src={`http://localhost:5001${album.cover_image_url}`} alt={album.product_name} className="alternative-rock-album-image" />
            <h2 className="alternative-rock-album-name">{album.product_name}</h2>
            <p className="alternative-rock-album-price">${album.price}</p>
            <button className="add-to-cart-alternative-rock" onClick={() => handleAddToCart(album.product_id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlternativeRockPage;