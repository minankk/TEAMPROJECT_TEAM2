import React from "react";
import "./Signup.css"; // Ensure CSS is correctly linked
import Navbar from "./Navbar"; // Import Navbar component
import Footer from "./Footer"; // Import Footer component

const Signup = () => {
  return (
    <div>
      {/* Navbar Component */}
      <Navbar />

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search here" />
        <button>🔍</button>
        <button>🛒</button>
        <button>👤</button>
      </div>

      {/* Sign Up Container */}
      <main>
        <div className="signup-container">
          <h1>Create an Account</h1>
          <form action="/signup" method="POST">
            
            {/* Username Input Field */}
            <div className="input-field">
              <label htmlFor="user-name">User Name</label>
              <input type="text" id="user-name" placeholder="User name" required />
            </div>

            {/* Email Input Field */}
            <div className="input-field">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" placeholder="Email" required />
            </div>

            {/* Password Input Field */}
            <div className="input-field">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" placeholder="Password" required />
            </div>

            {/* Confirm Password Field */}
            <div className="input-field">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" placeholder="Confirm password" required />
            </div>

            {/* Sign Up Buttons */}
            <div className="button-group">
              <button type="submit">Sign Up</button>
              <button type="button" className="admin-signup">Admin Sign Up</button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Signup;
