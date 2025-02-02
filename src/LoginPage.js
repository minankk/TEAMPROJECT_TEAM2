import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { username, password });
  };

  return (
    <div className="Login-container">
      <h1>Login to your account</h1>
      <form onSubmit={handleLogin}>
        <div className="InputField">
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
        <div className="InputField">
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
        <button type="submit">Sign in</button>
        <button type="button" className="admin-signin">Admin Sign in</button>
        <p className="forgot-password"><Link to="/forgot-password">Forgot Password? Click here</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;
