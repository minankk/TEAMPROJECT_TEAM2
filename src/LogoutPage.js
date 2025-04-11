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

    const handleBackToLogin = () => {
        navigate("/login");
    };

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
