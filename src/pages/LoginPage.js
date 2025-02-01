import React from 'react';
import './LoginPage.css'; // Import your CSS file

const LoginPage = () => {
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

      <div className="Login-container">
        <h1>Login to your account</h1>
        <form action="/login" method="POST">
          <div className="InputField">
            <label htmlFor="User-name">User name:</label>
            <input type="text" id="User-name" placeholder="User name" required />
          </div>
          <div className="InputField">
            <label htmlFor="Password">Password:</label>
            <input type="password" id="Password" placeholder="Password" required />
          </div>
          <button type="submit">Sign in</button>
          <button type="button" className="admin-signin">Admin Sign in</button>
          <p className="forgot-password"><a href="#">Forgot Password? Click here</a></p>
        </form>
      </div>

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

export default LoginPage;