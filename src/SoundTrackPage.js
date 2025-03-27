// SoundtrackPage.js
import React, { useState, useEffect } from 'react';
import './SoundTrackPage.css';
import { useNavigate } from 'react-router-dom';

const SoundtrackPage = ({ handleAddToCart }) => {
  const [soundtracks, setSoundtracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/genres/soundtrack')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSoundtracks(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Soundtracks...</p>;
  if (error) return <p>Error loading Soundtracks: {error.message}</p>;

  return (
    <div className="soundtrack-page-container">
      <h1>Soundtracks</h1>
      <div className="soundtrack-albums-grid">
        {soundtracks.map((album) => (
          <div className="soundtrack-album-card" key={album.product_id}>
            <img
              src={`http://localhost:5001${album.cover_image_url}`}
              alt={album.name}
              className="soundtrack-album-image"
            />
            <h2 className="soundtrack-album-name">{album.name}</h2>
            <p className="soundtrack-album-artist">{album.artist_name}</p>
            <p className="soundtrack-album-price">{album.price}</p>
            <button
              className="add-to-cart-soundtrack"
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

export default SoundtrackPage;