import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo-red2.png"; 

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch login status from the backend
    fetch('http://localhost:5001/checksession', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.loggedIn);
      })
      .catch((error) => console.error("Error fetching login status:", error));
  }, []);

  // Handle user icon click
  const handleUserClick = () => {
    navigate(isLoggedIn ? "/dashboard" : "/login");
  };

  return (
    <header className="navbar-container">
      {/* Left: Logo */}
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="Vinyl Vault Logo" />
      </Link>

      {/* Center: Navigation Links */}
      <nav className="navbar">
        <ul>
          <li><Link to="/about-us">ABOUT US</Link></li>
          <li><Link to="/products">BROWSE PRODUCTS</Link></li>
          <li><Link to="/sale">SALE</Link></li>
        </ul>
      </nav>

      {/* Right: Search & Icons */}
      <div className="search-cart">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search records, artists, genres..."
            className="search-input"
          />
        </div>
        <button className="user-btn" onClick={handleUserClick}>
          <FaUser />
        </button>
        <Link to="/cart" className="cart-btn">
          <FaShoppingCart />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
