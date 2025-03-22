
// HipHopPage.js
import React, { useState, useEffect } from 'react';
import './HipHopPage.css'; // Create this CSS file
import { useNavigate } from 'react-router-dom';

const HipHopPage = () => {
  const [hipHopAlbums, setHipHopAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      setError(null); // Reset any previous errors
  
      try {
        const response = await fetch('http://localhost:5001/products/genre/Hip-Hop');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data && data.products && Array.isArray(data.products)) {
          setHipHopAlbums(data.products);
        } else {
          throw new Error('Invalid data format received from the server.');
        }
  
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Hip Hop albums:', err);
        setError(err);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  if (loading) return <p>Loading Hip Hop albums...</p>;
  if (error) return <p>Error loading Hip Hop albums: {error.message}</p>;

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
    <div className="hiphop-page-container">
      <h1>Hip Hop Albums</h1>
      <div className="hiphop-albums-grid">
        {hipHopAlbums.map((album) => (
          <div className="hiphop-album-card" key={album.product_id}>
            <img src={`http://localhost:5001${album.cover_image_url}`} alt={album.product_name}className="hip-hop-album-image" />
            <h2 className="hiphop-album-name">{album.product_name}</h2>
            <p className="hiphop-album-price">${album.price}</p>
            <button className="add-to-cart-hiphop" onClick={() => handleAddToCart(album.product_id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HipHopPage;