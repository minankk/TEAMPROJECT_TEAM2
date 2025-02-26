import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SalesPage.css';
import SaleBanner from './assets/Carousel2.jpg';

const SalesPage = () => {
  const [products, setProducts] = useState([]);  
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    fetch('http://localhost:5001/sale-products')  
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);  
        } else {
          console.error('Unexpected response format:', data);
          setProducts([]);  
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setProducts([]);  
      });
  }, []);

  // Handle add to cart
  const handleAddToCart = (productId) => {
    console.log('Adding product to cart:', productId);
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
        <h2>All Sale Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.product_id} className="sales-product-card">
              <img
                src={`http://localhost:5001${product.cover_image_url}`}
                alt={product.product_name}
                className="sales-product-image"
              />
              <div className="sales-product-info">
                <h3>{product.album_title}</h3>
                <p>{product.product_name}</p>
                <p>{product.artist_name}</p>
                <p>{product.release_date}</p>
                <p>{product.price}</p>
              </div>
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product.product_id)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default SalesPage;