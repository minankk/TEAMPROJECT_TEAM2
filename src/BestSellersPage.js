import React, { useState, useEffect } from 'react';
import './BestSellersPage.css'; // Create this CSS file

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API call to fetch best-selling products
    fetch('http://localhost:5001/best-sellers') // Example API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setBestSellers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading best sellers...</p>;
  if (error) return <p>Error loading best sellers: {error.message}</p>;

  return (
    <div className="best-sellers-container">
      <h1>Best Sellers</h1>
      <div className="products-grid">
        {bestSellers.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;