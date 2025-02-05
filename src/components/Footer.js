import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Company Section */}
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/t&c">Terms and conditions</Link></li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div className="footer-column">
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/FAQs">FAQs</Link></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <button aria-label="Twitter">🐦</button>
            <button aria-label="Instagram">📸</button>
            <button aria-label="Email">📧</button>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Vinyl Vault. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
