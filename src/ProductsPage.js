import React, { useEffect, useState } from 'react';
import './ProductsPage.css';
import Carousel1 from './assets/Carousel1.jpg';
 
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
 
 const Banner = () => (
    <section className="products-banner">
      <img src={Carousel1} alt="Vinyl Collection" className="products-banner-image" />
      <div className="products-banner-text products-banner-text-left">
        <h1>Browse the Products and Get the Best Offer</h1>
      </div>
    </section>
  );
 
  useEffect(() => {
    fetch('http://localhost:5001/products')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched products:', data); // Log the fetched data
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);
 
  const groupedProducts = products.reduce((acc, product, index) => {
    const genre = product.genre;
    if (!acc[genre]) {
      acc[genre] = [];
    }
    acc[genre].push(product);
    return acc;
  }, {});
 
 
  return (
    <main>
      <Banner />
      <section className="products">
        {Object.keys(groupedProducts).map((genre, index) => (
          <div key={index} className="genre-section">
            <h2>{genre}</h2>
            <div className="product-grid">
              {groupedProducts[genre].map(product => (
                <div key={product.product_id} className="product-card">
                  <img src={`http://localhost:5001${product.cover_image_url}`} alt={product.name} className="product-image" />
                  <div className="product-info">
                    <h3>{product.album_name}</h3>
                    <p>{product.artist_name}</p>
                    <p>{product.release_date}</p>
                    <p>{product.price}</p>
                  </div>
                  <button className="buy-button">Add to Cart</button>
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