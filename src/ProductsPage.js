import React, { useEffect, useState } from 'react';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/products')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched products:', data); // Log the fetched data
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <main>
      <section className="products">
        <h2>Newest Additions</h2>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.product_id} className="product-card">
              <img src={`http://localhost:5001${product.cover_image_url}`} alt={product.name} />
              <h3>{product.album_name}</h3>
              <p>{product.artist_name}</p>
              <p>{product.genre}</p>
              <p>{product.release_date}</p>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
