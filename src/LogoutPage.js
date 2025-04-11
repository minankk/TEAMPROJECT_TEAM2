import React, { useState, useEffect } from "react";
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
            {logoutComplete ? (
                <div className="logout-box">
                    <h1>🎉 Logged Out! 🎉</h1>
                    <p className="logout-message">You have been successfully logged out.</p>
                    <p className="logout-submessage">Please login again.</p>
                    <button className="logout-button" onClick={handleBackToLogin}>
                        Back to Login
                    </button>
                </div>
            ) : (
                <div className="logout-box">
                    <p>Logging out...</p>
                </div>
            )}
        </div>
    );
};

export default LogoutPage;