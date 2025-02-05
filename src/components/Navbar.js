import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

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
        setIsLoggedIn(data.loggedIn); // Set login status based on the response
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

    // Handle user icon click
    const handleUserClick = () => {
      if (isLoggedIn) {
        navigate("/dashboard"); // Redirect to dashboard if logged in
      } else {
        navigate("/login"); // Redirect to login if not logged in
      }
    };

  return (
    <header className="navbar-container">
      <div className="logo">Vinyl Vault</div>

      <nav className="navbar">
        <ul>
          <li><Link to="/">Homepage</Link></li>
          <li><Link to="/products">Browse Products</Link></li>
          <li><Link to="/best-sellers">Best Sellers</Link></li>
          <li><Link to="/sale">Sale</Link></li>
        </ul>
      </nav>

      <div className="search-cart" ref={searchRef}>
        <button className="search-btn" onClick={toggleSearch}>
          <FaSearch />
        </button>

        {showSearch && (
          <input
            type="text"
            placeholder="Search records/artists/genre..."
            className="search-input"
          />
        )}
     {/* User icon now redirects based on login status */}
     <button className="user-btn" onClick={handleUserClick}>
          <FaUser />
        </button>
        <button className="cart-btn"><FaShoppingCart /></button>
      </div>
    </header>
  );
};

export default Navbar;
