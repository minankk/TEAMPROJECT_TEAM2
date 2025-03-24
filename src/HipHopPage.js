// HipHopPage.js
import React, { useState, useEffect } from 'react';
import './HipHopPage.css';
import { useNavigate } from 'react-router-dom';

const HipHopPage = ({ handleAddToCart }) => {
  const [hipHopAlbums, setHipHopAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/products/genre/Hip-Hop')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHipHopAlbums(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Hip Hop albums...</p>;
  if (error) return <p>Error loading Hip Hop albums: {error.message}</p>;

  return (
    <div className="hiphop-page-container">
      <h1>Hip Hop Albums</h1>
      <div className="hiphop-albums-grid">
        {hipHopAlbums.map((album) => (
          <div className="hiphop-album-card" key={album.product_id}>
            <img
              src={`http://localhost:5001${album.cover_image_url}`}
              alt={album.name}
              className="hip-hop-album-image"
            />
            <h2 className="hiphop-album-name">{album.name}</h2>
            <p className="hiphop-album-artist">{album.artist_name}</p>
            <p className="hiphop-album-price">£{album.price}</p>
            <button
              className="add-to-cart-hiphop"
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

export default HipHopPage;