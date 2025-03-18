import React, { useState, useEffect } from 'react';
import './BestSellersPage.css';
const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    fetch('http://localhost:5001/best-sellers')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBestSellers(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);
 
  if (loading) return <p>Loading best sellers...</p>;
  if (error) return <p>Error loading best sellers: {error.message}</p>;
  if (bestSellers.length === 0) return <p>No best-selling products available</p>;
 
  return (
    <div className="best-sellers-container">
      <h1>Best Sellers</h1>
      <div className="products-grid">
        {bestSellers.map((product) => (
          <div className="product-card" key={product.product_id}>
            {/* Use product.cover_image_url for the image */}
            <img
              src={`http://localhost:5001${product.cover_image_url}`}
              alt={product.album_name}
              className="product-image"
            />
            <h2 className="product-name">{product.album_name}</h2>
            <p className="product-artist">{product.artist_name}</p>
            <p className="product-genre">{product.genre}</p>
            <p className="product-price">${product.price}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default BestSellers;
 