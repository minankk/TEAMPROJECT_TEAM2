import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import Logo from "../assets/logo-red2.png"; // Adjust path to your logo file

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Left Section: Logo & Description */}
        <div className="footer-left">
          <img src={Logo} alt="Vinyl Vault Logo" className="footer-logo" />
          <p className="footer-tagline">
            <strong>VINYL VAULT</strong> seeks to <strong>savour the spin</strong> of records,
            embracing the artistry of the album as a timeless experience.
          </p>
        </div>

        {/* Middle Sections: Links */}
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/t&c">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/FAQs">FAQs</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <button aria-label="Twitter">🐦</button>
            <button aria-label="Instagram">📸</button>
            <button aria-label="Email">📧</button>
          </div>
        </div>
      </div>

      {/* Copyright - Positioned at the Bottom Right */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Vinyl Vault. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
