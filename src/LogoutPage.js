import React from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutPage.css"; 

const LogoutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="thank-you-container">
      <h1>🎉 Thank You! 🎉</h1>
      <p>Your submission was successful. We appreciate your time!</p>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default LogoutPage;
