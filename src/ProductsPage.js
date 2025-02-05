import React from "react";
import './ProductsPage.css';

const ProductsPage = () => {
  return (
    <main>
      <section className="categories">
        <div><img src="#" alt="Albums" /></div>
        <div><img src="#" alt="Artists" /></div>
        <div><img src="#" alt="Genres" /></div>
        <div><img src="#" alt="Top Rated" /></div>
      </section>

      <section className="products">
        <h2>Newest Additions</h2>
        <div className="product-grid">
          <div className="product-card">Product 1</div>
          <div className="product-card">Product 2</div>
          <div className="product-card">Product 3</div>
          <div className="product-card">Product 4</div>
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
