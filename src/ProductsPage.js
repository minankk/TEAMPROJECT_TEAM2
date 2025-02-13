import React, { useEffect, useState } from 'react';
import './ProductsPage.css';
import Carousel1 from './assets/Carousel1.jpg';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  // Banner Component
  const Banner = () => (
    <section className="products-banner">
      <img
        src={Carousel1}
        alt="Vinyl Collection"
        className="products-banner-image"
      />
      <div className="products-banner-text products-banner-text-left">
        <h1>Browse the Products and Get the Best Offer</h1>
      </div>
    </section>
  );

  // Fetch products from the backend
  useEffect(() => {
    fetch('http://localhost:5001/products')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched products:', data);
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Group products by genre for display
  const groupedProducts = products.reduce((acc, product) => {
    // Assuming each product has a 'genre' field; use "Others" as fallback
    const genre = product.genre || 'Others';
    if (!acc[genre]) {
      acc[genre] = [];
    }
    acc[genre].push(product);
    return acc;
  }, {});

  // Handler for adding product to cart (only allowed for product_id = 1)
  const handleAddToCart = (productId) => {
    if (productId !== 1) {
      // In the demo, only product 1 is allowed
      alert('Demo: Only the first product can be added to the cart.');
      return;
    }

    fetch('http://localhost:5001/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 1,      // Hard-coded demo user
        product_id: 1,   // Only allow the first product
        quantity: 1,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to MyCart page after successfully adding
          window.location.href = 'http://localhost:5001/cart/1';
        } else {
          console.error('Failed to add product to cart.');
        }
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
      });
  };

  return (
    <main>
      <Banner />
      <section className="products">
        {Object.keys(groupedProducts).map((genre, index) => (
          <div key={index} className="genre-section">
            <h2>{genre}</h2>
            <div className="product-grid">
              {groupedProducts[genre].map((product) => (
                <div key={product.product_id} className="product-card">
                  <img
                    src={`http://localhost:5001${product.cover_image_url}`}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3>{product.album_name}</h3>
                    <p>{product.artist_name}</p>
                    <p>{product.release_date}</p>
                    <p>{product.price}</p>
                  </div>
                  <button
                    className="buy-button"
                    // Only product with product_id 1 has an active click event
                    onClick={() => handleAddToCart(product.product_id)}
                    disabled={product.product_id !== 1}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default ProductsPage;
