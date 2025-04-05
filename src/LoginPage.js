import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './App';
import './LoginPage.css';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (isSignUp) {
      // Sign Up Logic
      const trimmedData = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
        password_confirmation: formData.confirmPassword.trim(),
      };

      if (!trimmedData.username || !trimmedData.email || !trimmedData.password || !trimmedData.password_confirmation) {
        setError("All fields are required for signup.");
        return;
      }

      if (trimmedData.password !== trimmedData.password_confirmation) {
        setError("Passwords do not match.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5001/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(trimmedData),
        });

        const data = await response.json();
        if (response.ok) {
          login(data.token); // Assuming backend returns a token
          navigate('/'); // Redirect after signup
        } else {
          setError(data.message || "Signup failed");
        }
      } catch (error) {
        setError("Error signing up. Please try again.");
      }

    } else {
      // Login Logic
      const { usernameOrEmail, password } = formData;

      if (!usernameOrEmail.trim() || !password.trim()) {
        setError("Both fields are required for login.");
        return;
      }

      try {
        const response = await fetch('http://localhost:5001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: usernameOrEmail.trim(), password: password.trim() }), // Adjust if backend accepts email
        });

        const data = await response.json();

        if (data.token) {
          login(data.token);
          navigate('/dashboard');
        } else {
          setError(data.message || 'Login failed');
        }
      } catch (error) {
        setError('Error logging in: ' + error.message);
      }
    }
  };

  return (
    <div id="login-page">
      <main className="auth-container">
        <div className={`form-container ${isSignUp ? 'signup-active' : 'login-active'}`}>
          <h1>{isSignUp ? 'Create an Account' : 'Login to your Account'}</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
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
              </>
            )}
            {!isSignUp && (
              <div className="input-field">
                <label htmlFor="usernameOrEmail">Username or Email</label>
                <input
                  type="text"
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  placeholder="Username or Email"
                  value={formData.usernameOrEmail}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
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
            {isSignUp && (
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
            )}

            <div className="button-group">
              <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
              <button
                type="button"
                className="toggle-button"
                onClick={() => {
                  setError(null);
                  setIsSignUp(!isSignUp);
                }}
              >
                {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>

          {!isSignUp ? (
            <>
              <p className="forgot-password"><Link to="/forgot-password">Forgot Password?</Link></p>
              <p className="admin-link"><Link to="/admin-login">Admin Login</Link></p>
            </>
          ) : (
            <p className="admin-link"><Link to="/admin-signup">Admin Sign Up</Link></p>
          )}
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
