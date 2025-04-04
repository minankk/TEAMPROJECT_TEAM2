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

    // ... (rest of your handleSubmit logic) ...
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
              <button type="button" className="toggle-button" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>
          {!isSignUp && (
            <>
              <p className="forgot-password"><Link to="/forgot-password">Forgot Password?</Link></p>
              <p className="admin-link"><Link to="/admin-login">Admin Login</Link></p>
            </>
          )}
          {isSignUp && (
            <p className="admin-link"><Link to="/admin-signup">Admin Sign Up</Link></p>
          )}
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
