import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo-red2.png";

const Navbar = ({ isLoggedIn }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [genresOpen, setGenresOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <header className="navbar-container">
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="Vinyl Vault Logo" />
      </Link>
      <nav className="navbar">
        <ul>
          <li
            className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link to="/products">BROWSE PRODUCTS</Link>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/artists">Artists</Link></li>
                <li><Link to="/release-decade">Release Decade</Link></li>
                <li
                  className="dropdown-submenu"
                  onMouseEnter={() => setGenresOpen(true)}
                  onMouseLeave={() => setGenresOpen(false)}
                >
                  <Link to="/genres">Genres</Link>
                  {genresOpen && (
                    <ul className="submenu">
                      <li><Link to="/genres/alternative-rock">Alternative Rock</Link></li>
                      <li><Link to="/genres/hip-hop">Hip Hop</Link></li>
                      <li><Link to="/genres/soundtrack">Soundtrack</Link></li>
                      <li><Link to="/genres/pop">Pop</Link></li>
                      <li><Link to="/genres/rock">Rock</Link></li>
                    </ul>
                  )}
                </li>
                <li><Link to="/newest-additions">Newest Additions</Link></li>
                <li><Link to="/best-sellers">Best Sellers</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/sale">SALE</Link></li>
          <li><Link to="/about-us">ABOUT US</Link></li>
        </ul>
      </nav>
      <div className="search-cart">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search records, artists, genres..."
            className="search-input"
          />
        </div>
        <div
          className="user-dropdown"
          onMouseEnter={() => isLoggedIn && setUserDropdownOpen(true)}
          onMouseLeave={() => setUserDropdownOpen(false)}
        >
          <button className="user-btn" onClick={handleUserClick}>
            <FaUser />
          </button>
          {isLoggedIn && (
            <ul className={`user-dropdown-menu ${userDropdownOpen ? 'open' : ''}`}>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/orders">Orders</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          )}
        </div>
        <Link to="/cart" className="cart-btn">
          <FaShoppingCart />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;