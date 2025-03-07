import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

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
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response:', data);

        if (data.token) {
          alert('Login successful');
          localStorage.setItem('token', data.token); // Store the token in localStorage
          console.log('Token stored:', localStorage.getItem('token')); // Verify token storage
          navigate('/dashboard'); // Redirect to dashboard
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