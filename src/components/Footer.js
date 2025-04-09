import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import Logo from "../assets/logo-red2.png";
import { FaXTwitter, FaInstagram, FaEnvelope, FaSpotify } from "react-icons/fa6"; // FontAwesome Icons

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
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/FAQs">FAQs</Link></li>
            <li><Link to="/delivery-information">Delivery Information</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Company Info</h4>
          <ul>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/t&c">Terms & Conditions</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="footer-column">
          <h4>Follow Us On:</h4>
          <div className="social-icons">
            <a href="https://x.com/vault_viny" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaXTwitter />
            </a>
            <a href="https://www.instagram.com/officailvinylvaultrecords/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="mailto:info@vinylvault.com" aria-label="Email">
              <FaEnvelope />
            </a>
            <a href="https://open.spotify.com/?trackId=0g1Y10aIIdJDkcSEuAq51k" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
              <FaSpotify />
            </a>
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
