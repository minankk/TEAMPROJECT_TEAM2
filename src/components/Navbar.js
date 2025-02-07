import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo-red2.png";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch login status from the backend
    fetch('/')
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.loggedIn); // Set login status based on response
      })
      .catch((error) => console.error('Error fetching login status:', error));
  }, []);

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserClick = () => {
    navigate(isLoggedIn ? "/dashboard" : "/login");
  };

  return (
    <header className="navbar-container">
      <Link to="/" className="logo-container">
        <img src={logo} alt="Vinyl Vault Logo" className="navbar-logo" />
      </Link>

      <nav className="navbar">
        <ul>
          <li><Link to="/products">Browse Products</Link></li>
          <li><Link to="/best-sellers">Best Sellers</Link></li>
          <li><Link to="/sale">Sale</Link></li>
        </ul>
      </nav>

      <div className="search-cart" ref={searchRef}>
        <button className="search-btn" onClick={toggleSearch} aria-label="Search">
          <FaSearch />
        </button>

        {showSearch && (
          <input
            type="text"
            placeholder="Search records, artists, genres..."
            className="search-input"
            autoFocus
          />
        )}

        <button className="user-btn" onClick={handleUserClick} aria-label="User Account">
          <FaUser />
        </button>
        <button className="cart-btn" aria-label="Shopping Cart">
          <FaShoppingCart />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
