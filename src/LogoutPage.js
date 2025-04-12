import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutPage.css';

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="logout-container">
      <div className="logout-box">
        <div className="logout-content">
          <h1>You’ve Logged Out</h1>
          <p className="logout-message">Hope to see you again soon!</p>
          <p className="logout-submessage">Thank you for visiting Vinyl Vault.</p>
        </div>
        <div className="logout-footer">
          <button className="logout-button" onClick={handleBackHome}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
