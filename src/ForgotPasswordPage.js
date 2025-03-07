import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./ForgotPasswordPage.css"; // Import CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    // Mock success message (Remove this when integrating with backend)
    setMessage("If an account is associated with this email, you will receive a password reset link shortly.");
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
