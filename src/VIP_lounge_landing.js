import React, { useState } from "react";
import "./VIP_lounge_landing.css";
import Lounge_Background from "./assets/VV_LOUNGE_BACKGROUND.png";
import { Link } from 'react-router-dom';

const VIPLoungeLanding = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");

  const handleJoinClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEmail("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for joining, ${email}!`);
    handleClosePopup();
  };

  return (
    <div className="vip-lounge-section">
      <div className="vip-blur-overlay"></div>
      <div className="vip-content">
      <h2>
        <span class="step-into">STEP INTO </span>
        <span class="the">The </span>
        <span class="lounge">LOUNGE</span>
      </h2>
        <p>
        The Vinyl Vault Lounge isn’t just about buying vinyl—it’s a community where music lovers come together. As a member, you'll enjoy exclusive discounts, access to unbeatable deals, early pre-orders, insider news through our newsletter, and special invitations to exclusive community events. So kick back, relax, and enjoy the perks of being part of the VIP sound experience..
        </p>
        <Link to="/vip-signup" className="join-now-button">
            Join Now <span className="arrow">→</span>
        </Link>
      </div>
      {/* {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Unlock Your VIP Access</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Submit</button>
            </form>
            <button className="close-button" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default VIPLoungeLanding;
