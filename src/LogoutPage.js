
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './App'; 

import './LogoutPage.css';

const LogoutPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [logoutComplete, setLogoutComplete] = useState(false);
    const [logoutAttempted, setLogoutAttempted] = useState(false);


    useEffect(() => {
        console.log("LogoutPage useEffect running");

        if (!logoutAttempted) {
            setLogoutAttempted(true);

            const logoutUser = async () => {
                const storedToken = localStorage.getItem("token");

                try {
                    const response = await fetch("http://localhost:5001/logout", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${storedToken}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.ok) {
                        console.log("Backend logout successful");
                    } else {
                        console.error("Backend logout failed:", response.status);
                    }
                } catch (error) {
                    console.error("Error during logout:", error);
                } finally {
                    
                    localStorage.removeItem("token");
                    sessionStorage.clear();
                    logout(); 
                    setLogoutComplete(true);
                }
            };

            logoutUser();
        }
    }, [logout, logoutAttempted]);


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
