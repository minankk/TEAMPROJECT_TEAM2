import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import Logo from "../assets/logo-red2.png";
import { FaXTwitter, FaInstagram, FaEnvelope, FaSpotify } from "react-icons/fa6";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      let user_id = null;

      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          user_id = decodedToken.user_id;
        } catch (decodeError) {
          console.error("Error decoding token:", decodeError);
          setError("Invalid login session. Please log in again.");
          setLoading(false);
          return;
        }
      }

      const payload = {
        email: email,
        preferences: ["footer"],
      };

      if (user_id) {
        payload.user_id = user_id;
      }

      const response = await fetch('http://localhost:5001/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text(); // raw response
        try {
          const errorData = JSON.parse(text);
          throw new Error(errorData.message || 'Failed to subscribe.');
        } catch {
          throw new Error('Unexpected error. Please try again later.');
        }
      }

      const data = await response.json();
      setMessage(data.message || 'Subscribed successfully!');
      setEmail('');
    } catch (err) {
      setError(err.message || 'Subscription failed.');
    } finally {
      setLoading(false);
    }
  };

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

      {/* Bottom Row: Newsletter + Copyright */}
      <div className="footer-bottom-row">
        <form className="footer-newsletter" onSubmit={handleNewsletterSubmit}>
          <p className="newsletter-heading">Subscribe to our newsletter!</p>
          <div className="newsletter-form-wrapper">
            <input
              type="email"
              className="newsletter-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="newsletter-button"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Vinyl Vault. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
