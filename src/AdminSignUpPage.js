import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    secretKey: "",
  });

  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    // Trim values to remove leading/trailing spaces
    const trimmedData = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      password_confirmation: formData.confirmPassword.trim(), // Match backend field name
      adminSecretKey: formData.secretKey.trim(),
    };

    // Check for empty fields
    if (!trimmedData.username || !trimmedData.email || !trimmedData.password || !trimmedData.password_confirmation || !trimmedData.adminSecretKey) {
      setError("All fields must be filled!");
      return;
    }

    if (trimmedData.password !== trimmedData.password_confirmation) {
      setError("Passwords do not match!");
      return;
    }

    console.log("Form Data:", trimmedData);

    try {
      const response = await fetch("http://localhost:5001/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trimmedData),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.role === 'admin' && data.message.includes('pending')) {
          setShowPopup(true);
        } else {
          alert("Signup successful!");
          localStorage.setItem('token', data.token); // Store the token in localStorage
        }
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      setError("Error signing up. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <main>
        <div className="signup-container">
          <h1>Create an Admin Account</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="User name"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="secretKey">Secret Key</label>
              <input
                type="text"
                id="secretKey"
                name="secretKey"
                placeholder="Secret Key"
                value={formData.secretKey}
                onChange={handleChange}
                required
              />
            </div>
            <div className="button-group">
              <button type="submit" className="signup-button">Sign Up</button>
              <Link to="/signup" className="user-signup-link">
                Looking to sign up as a user? Click here!
              </Link>
            </div>
          </form>
        </div>
        <div className="login-container">
          <h2>Already have an account?</h2>
          <p>If you already have an account, you can log in here:</p>
          <Link to="/login" className="login-link">Login</Link>
        </div>
      </main>
      {showPopup && (
        <div className="admin-popup">
          <div className="admin-popup-content">
            <h2>Signup Request Sent</h2>
            <p>Your signup request has been sent. You will be notified of your approval status shortly.</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSignup;