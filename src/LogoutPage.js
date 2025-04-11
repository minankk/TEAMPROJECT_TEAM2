import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './LogoutPage.css';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session data on logout
    localStorage.removeItem("token");
    sessionStorage.clear();
  }, []);

  return (
    <div className="logout-container">
      <div className="logout-box">
        <h1>🎉 Logged Out! 🎉</h1>
        <p className="logout-message">You have been successfully logged out.</p>
        <p className="logout-submessage">We hope to see you again soon!</p>
        <button className="logout-button" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
