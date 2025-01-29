import React from "react";
import "./App.css"; // Assuming your styles are in App.css

function App() {
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

      <section className="banner">
        <div className="banner-content">
          {/* Placeholder for banner content */}
        </div>
      </section>

      <section className="content">
        <div className="section">
          <div className="item">Item 1</div>
          <div className="item">Item 2</div>
          <div className="item">Item 3</div>
        </div>
        <div className="section">
          <div className="item">Item 4</div>
          <div className="item">Item 5</div>
          <div className="item">Item 6</div>
        </div>
      </section>

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
}

export default App;
