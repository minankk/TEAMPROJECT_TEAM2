// RockPage.js
import React, { useState, useEffect } from 'react';
import './RockPage.css'; // Ensure you have this CSS file
import { useNavigate } from 'react-router-dom';

const RockPage = () => {
  const [rockAlbums, setRockAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('http://localhost:5001/genres/rock');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data && data.products && Array.isArray(data.products)) {
          setRockAlbums(data.products);
        } else {
          throw new Error('Invalid data format received from the server.');
        }
      } catch (err) {
        console.error('Error fetching Rock albums:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) return <p>Loading Rock albums...</p>;
  if (error) return <p>Error loading Rock albums: {error.message}</p>;

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
    <div className="rock-page-container">
      <h1>Rock Albums</h1>
      <div className="rock-albums-grid">
        {rockAlbums.map((album) => (
          <div className="rock-album-card" key={album.product_id}>
            <img src={`http://localhost:5001${album.cover_image_url}`} alt={album.product_name} className="rock-album-image" />
            <h2 className="rock-album-name">{album.product_name}</h2>
            <p className="rock-album-price">${album.price}</p>
            <button className="add-to-cart-rock" onClick={() => handleAddToCart(album.product_id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RockPage;
