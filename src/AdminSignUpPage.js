import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminSignUpPage.css"; // Import the CSS

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

    const trimmedData = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      password_confirmation: formData.confirmPassword.trim(),
      adminSecretKey: formData.secretKey.trim(),
    };

    if (!trimmedData.username || !trimmedData.email || !trimmedData.password || !trimmedData.password_confirmation || !trimmedData.adminSecretKey) {
      setError("All fields must be filled!");
      return;
    }

    if (trimmedData.password !== trimmedData.password_confirmation) {
      setError("Passwords do not match!");
      return;
    }

    console.log("Admin Signup Form Data:", trimmedData);

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
          alert("Admin signup successful!");
          localStorage.setItem('token', data.token);
        }
      } else {
        setError(data.message || "Admin signup failed");
      }
    } catch (error) {
      setError("Error signing up. Please try again.");
    }
  };

  return (
    <div id="admin-signup-page">
      <div className="form-container signup-active">
        <h1>Create an ADMIN Account</h1>
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
            <button type="submit">Sign Up</button>
          </div>
        </form>
        <button type="button" className="toggle-button">
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
            Not an admin? Click here!
          </Link>
        </button>
        <div className="admin-link">
          <Link to="/admin-login" style={{ color: '#00d4ff', textDecoration: 'none' }}>
            Already have an admin account? Login
          </Link>
        </div>
      </div>
      {showPopup && (
  <div className="admin-popup">
    <div className="admin-popup-content">
      <h2>Request Sent for Approval</h2>
      <p>Your signup request has been received and is pending admin approval.</p>
      <p>Please try logging in after a few days to check if your account has been approved or rejected.</p>
      <button onClick={() => setShowPopup(false)}>Close</button>
    </div>
  </div>
)}
    </div>
  );
};

export default AdminSignup;
