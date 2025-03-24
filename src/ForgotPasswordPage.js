import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPasswordPage.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/forgot-password", { // Replace with your backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Backend now returns the message you want to display
        setMessage(data.message);
      } else {
        setError(data.message || "An error occurred.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
      console.error("Error sending forgot password request:", err);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        {!message ? (
          <form onSubmit={handleSubmit}>
            <label>Please enter the email address you used to sign up</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            <button type="submit" className="forgot-password-button">
              Reset Password
            </button>
          </form>
        ) : (
          <button className="back-home-button" onClick={() => navigate("/")}>
            Back to Home
          </button>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;