import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
// import vinylIcon from './assets/vinyl-icon.webp';
 
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { username, password });
 
    fetch('http://localhost:5001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response:', data);
 
        if (data.message === 'Login successful') {
          alert(data.message);
 
          // After successful login, check session status and redirect
          fetch('http://localhost:5001/checksession', { credentials: 'include' })
            .then((res) => res.json())
            .then((sessionData) => {
              if (sessionData.loggedIn) {
                navigate('/dashboard'); // Redirect to landing page if already logged in
                window.location.reload();
              }
            })
            .catch((error) => {
              console.error('Error checking session:', error);
              alert('Error checking session');
            });
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error.message);
        alert(error.message); // Show error message
      });
  };
 
  return (
    <div className="login-page">
      <main className="auth-container">
        <div className="login-container">
          <h1>Login to your account</h1>
          <form onSubmit={handleLogin}>
            <div className="input-field">
              <label htmlFor="username">User name:</label>
              <input
                type="text"
                id="username"
                placeholder="User name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="button-group">
              <button type="submit">Sign in</button>
              <button type="button" className="admin-signin">Admin Sign in</button>
            </div>
            <p className="forgot-password"><Link to="/forgot-password">Forgot Password? Click here</Link></p>
          </form>
        </div>
        <div className="signup-container">
          <h2>New to our site?</h2>
          <p>If you don't have an account yet, you can sign up here:</p>
          <Link to="/signup" className="signup-link">Sign Up</Link>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;