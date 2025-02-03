import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./LandingPage.css"; 

function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate to use navigation

  useEffect(() => {
    // Fetch login status from the backend
    fetch('/')
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.loggedIn); // Set login status based on the response
      })
      .catch((error) => console.error('Error fetching login status:', error));
  }, []); 

  const handleLoginButtonClick = () => {
    // Navigate to the correct page based on the login status
      if (isLoggedIn) {
        navigate('/dashboard'); // Redirect to dashboard if logged in
      } else {
        navigate('/login'); // Navigate to login page if not logged in
      }
    };

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
          <button onClick={handleLoginButtonClick}>👤</button> {/* Use the same button to check login status */}
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

export default LandingPage;
