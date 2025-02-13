import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import your CSS file

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();  // Use the navigate hook to redirect after login

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { username, password });

    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    })
    .then(response => response.json())  // Convert response to JSON
  .then(data => {
    console.log("Login response:", data); // Debugging
    if (data.message === "Login successful") {
      alert(data.message);
      navigate('/');
    } else {
      throw new Error(data.message);
    }
  })
  .catch(error => {
    console.error('Error logging in:', error.message);
    alert(error.message); // Show error message
  });
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
        <button type="button" className="sign-Up" onClick={() => navigate('/signup')}>Sign Up</button>  
      </form>
    </div>
  );
};

export default LoginPage;
