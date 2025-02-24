import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SalesPage.css';
import SaleBanner from './assets/Carousel2.jpg';

const SalesPage = () => {
  const navigate = useNavigate();

  const handleAddToCart = (productId) => {
    console.log('Adding product to cart:', productId);
    // Redirect to cart page
    navigate('/cart');
  };

  return (
    <main className="sales-page">
      <section className="sales-banner">
        <img src={SaleBanner} alt="Sale Banner" className="sales-banner-image" />
        <div className="sales-banner-text">
          <h1>Exclusive Sale - Limited Time Offers!</h1>
        </div>
      </section>
      <section className="sales-products">
        {/* Example product cards */}
        <div className="sales-product-card">
          <img src="http://localhost:5001/example-product.jpg" alt="Product Name" className="sales-product-image" />
          <div className="sales-product-info">
            <h3>Product Name</h3>
            <p>Artist Name</p>
            <p>Release Date</p>
            <p>Sale Price</p>
          </div>
          <button className="add-to-cart-button" onClick={() => handleAddToCart(1)}>Add to Cart</button>
        </div>
        {/* Add more product cards as needed */}
      </section>
    </main>
  );
};

export default SalesPage;