// SoundtrackPage.js
import React, { useState, useEffect } from 'react';
import './SoundTrackPage.css'; 
import { useNavigate } from 'react-router-dom';

const SoundtrackPage = () => {
  const [soundtracks, setSoundtracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:5001/genres/soundtrack');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.products && Array.isArray(data.products)) {
          setSoundtracks(data.products);
        } else {
          throw new Error('Invalid data format received from the server.');
        }
      } catch (err) {
        console.error('Error fetching Soundtracks:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading Soundtracks...</p>;
  if (error) return <p>Error loading Soundtracks: {error.message}</p>;

  const handleAddToCart = (productId) => {
    const userId = 1; // Replace with actual user ID or get from context/state
    const quantity = 1; // Default quantity

    fetch('http://localhost:5001/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, product_id: productId, quantity }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          console.log(data.message);
          navigate('/cart');
        } else {
          console.error('Failed to add item to cart');
        }
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
      });
  };

  return (
    <div className="soundtrack-page-container">
      <h1>Soundtracks</h1>
      <div className="soundtrack-albums-grid">
        {soundtracks.map((album) => (
          <div className="soundtrack-album-card" key={album.product_id}>
            <img src={`http://localhost:5001${album.cover_image_url}`} alt={album.product_name} className="soundtrack-album-image" />
            <h2 className="soundtrack-album-name">{album.product_name}</h2>
            <p className="soundtrack-album-price">${album.price}</p>
            <button className="add-to-cart-soundtrack" onClick={() => handleAddToCart(album.product_id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoundtrackPage;