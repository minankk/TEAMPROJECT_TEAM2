import React from 'react';
import 'C:/Users/Admin/TEAMPROJECT_TEAM2/TEAMPROJECT_TEAM2/src/ProductsPage.css'; // Adjust the path as needed

const ProductsPage = () => {
    return (
      <div>
        <header>
          <div className="header-left">
            <div className="logo">Logo</div>
            <nav className="navbar">
              <ul>
                <li><a href="#">Homepage</a></li>
                <li><a href="#">New in Store</a></li>
                <li><a href="#">Best Sellers</a></li>
                <li><a href="#">Sale</a></li>
                <li><a href="#">Browse</a></li>
              </ul>
            </nav>
          </div>
          <div className="search-cart">
            <input type="text" placeholder="Search here" />
            <button>🔍</button>
            <button>🛒</button>
            <button>👤</button>
          </div>
        </header>
  
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
  
          <section className="products">
            <h2>Most Popular Items</h2>
            <div className="product-grid">
              <div className="product-card">Product 5</div>
              <div className="product-card">Product 6</div>
              <div className="product-card">Product 7</div>
              <div className="product-card">Product 8</div>
            </div>
          </section>
  
          <section className="products">
            <h2>Special Offers</h2>
            <div className="product-grid">
              <div className="product-card">Product 9</div>
              <div className="product-card">Product 10</div>
              <div className="product-card">Product 11</div>
              <div className="product-card">Product 12</div>
            </div>
          </section>
        </main>
  
        <footer>
          <div className="footer-links">
            <div>
              <h4>Company</h4>
              <p><a href="#">About Us</a></p>
              <p><a href="#">Stakeholders</a></p>
            </div>
            <div>
              <h4>Customer Service</h4>
              <p><a href="#">Contact Us</a></p>
              <p><a href="#">My Account</a></p>
            </div>
          </div>
          <div className="social-icons">
            <button>🐦</button>
            <button>📸</button>
            <button>📧</button>
          </div>
        </footer>
      </div>
    );
  };
  
  export default ProductsPage;