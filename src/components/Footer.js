import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import Logo from "../assets/logo-red2.png";
import { FaXTwitter, FaInstagram, FaSpotify } from "react-icons/fa6";
import { FaSnapchatGhost } from "react-icons/fa";


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
        email,
        preferences: ["footer"],
      };
  
      if (user_id) {
        payload.user_id = user_id;
      }
  
      const response = await fetch('http://localhost:5001/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed.');
      }
  
      // Show different messages based on guest or registered
      if (data.token) {
        setMessage("🎉 Check your inbox to confirm your subscription!");
      } else {
        setMessage("🎶 You're subscribed! Thanks for joining Vinyl Vault.");
      }
  
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
        <div className="footer-left">
          <img src={Logo} alt="Vinyl Vault Logo" className="footer-logo" />
          <p className="footer-tagline">
            <strong>VINYL VAULT</strong> seeks to <strong>savour the spin</strong> of records,
            embracing the artistry of the album as a timeless experience.
          </p>
        </div>

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

        <div className="footer-column">
          <h4>Follow Us On:</h4>
          <div className="social-icons">
            <a href="https://x.com/vault_viny" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaXTwitter />
            </a>
            <a href="https://www.instagram.com/officailvinylvaultrecords/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.snapchat.com/web/" target="_blank" rel="noopener noreferrer" aria-label="Snapchat">
              <FaSnapchatGhost />
            </a>
            <a href="https://open.spotify.com/?trackId=0g1Y10aIIdJDkcSEuAq51k" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
              <FaSpotify />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom-row">
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Vinyl Vault. All Rights Reserved.</p>
        </div>
        <form id="vinyl-vault-footer-newsletter" className="footer-newsletter" onSubmit={handleNewsletterSubmit}>
          <p className="newsletter-heading">Subscribe to our newsletter for the latest offers!</p>
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
      </div>
    </footer>
  );
};

export default Footer;
