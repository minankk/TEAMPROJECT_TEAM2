import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./SignUp.css"; // Ensure CSS is correctly linked

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // Handle form changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    // Check if passwords match before sending request
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        }),
        credentials: "include", // Ensure cookies are sent for session management
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signup successful!");
        navigate("/dashboard"); // Redirect to DashboardPage
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      setError("Error signing up. Please try again.");
    }
  };

  return (
    <div>
      <main>
        <div className="signup-container">
          <h1>Create an Account</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            {/* Username Input */}
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

            {/* Email Input */}
            <div className="input-field">
              <label htmlFor="email">Email:</label>
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

            {/* Password Input */}
            <div className="input-field">
              <label htmlFor="password">Password:</label>
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

            {/* Confirm Password Input */}
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

            {/* Submit Button */}
            <div className="button-group">
              <button type="submit">Sign Up</button>
              <button type="button" className="admin-signup">
                Admin Sign Up
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Signup;
