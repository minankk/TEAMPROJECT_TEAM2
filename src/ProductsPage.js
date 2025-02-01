import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import './ProductsPage.css'; // Adjust the path as needed

const ProductsPage = () => {
    return (
      <div>
        <header>
          <div className="header-left">
            <div className="logo">Logo</div>
            <nav className="navbar">
              <ul>
                <li><Link to="/">Homepage</Link></li> {/* Change to Link */}
                <li><Link to="/new-in-store">New in Store</Link></li> {/* Change to Link */}
                <li><Link to="/best-sellers">Best Sellers</Link></li> {/* Change to Link */}
                <li><Link to="/sale">Sale</Link></li> {/* Change to Link */}
                <li><Link to="/browse">Browse</Link></li> {/* Change to Link */}
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
              <p><Link to="/about-us">About Us</Link></p> {/* Change to Link */}
              <p><Link to="/stakeholders">Stakeholders</Link></p> {/* Change to Link */}
            </div>
            <div>
              <h4>Customer Service</h4>
              <p><Link to="/contact-us">Contact Us</Link></p> {/* Change to Link */}
              <p><Link to="/my-account">My Account</Link></p> {/* Change to Link */}
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
