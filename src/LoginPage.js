import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import your CSS file

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();  // Use the navigate hook to redirect after login

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { username, password });

    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())  // Convert response to JSON
  .then(data => {
    console.log("Login response:", data); // Debugging
    if (data.message === "Login successful") {
      alert(data.message);
      navigate('/');
    } else {
      throw new Error(data.message);
    }
  })
  .catch(error => {
    console.error('Error logging in:', error.message);
    alert(error.message); // Show error message
  });
  };

  return (
    <div>
      {/* Header Section */}
      <header>
        <div className="header-left">
          <div className="logo">Logo</div>
          <nav className="navbar">
            <ul>
              <li><Link to="/">Homepage</Link></li>
              <li><Link to="/new-in-store">New in Store</Link></li>
              <li><Link to="/best-sellers">Best Sellers</Link></li>
              <li><Link to="/sale">Sale</Link></li>
              <li><Link to="/browse">Browse</Link></li>
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

      {/* Login Section */}
      <div className="Login-container">
        <h1>Login to your account</h1>
        <form onSubmit={handleLogin}>
          <div className="InputField">
            <label htmlFor="username">User name:</label>
            <input
              type="text"
              id="username"
              placeholder="User name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="InputField">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign in</button>
          <button type="button" className="admin-signin">Admin Sign in</button>
          <p className="forgot-password"><Link to="/forgot-password">Forgot Password? Click here</Link></p>
        </form>
      </div>

      {/* Footer Section */}
      <footer>
        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <p><Link to="/about-us">About Us</Link></p>
            <p><Link to="/stakeholders">Stakeholders</Link></p>
          </div>
          <div>
            <h4>Customer Service</h4>
            <p><Link to="/contact-us">Contact Us</Link></p>
            <p><Link to="/my-account">My Account</Link></p>
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
