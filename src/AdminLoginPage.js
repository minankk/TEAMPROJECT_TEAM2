import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './AdminLoginPage.css';

const AdminLoginPage = () => {
  const navigate = useNavigate(); // ✅ Keep this inside the component

  const [formData, setFormData] = useState({
    username: '',   // using username to match backend
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const trimmedData = {
      username: formData.username.trim(),
      password: formData.password.trim(),
    };

    if (!trimmedData.username || !trimmedData.password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimmedData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/admin'); // redirect to admin dashboard
      } else {
        setError(data.message || 'Admin login failed.');
      }
    } catch (error) {
      setError('There was an error logging in. Please try again.');
    }
  };

  return (
    <div id="admin-login-page">
      <div className="form-container">
        <h1>ADMIN Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="username">Email or Username</label>
            <input
              type="text"                      // ✅ Changed from email to text
              id="username"
              name="username"                 // ✅ Matches backend logic
              placeholder="Email or Username"
              value={formData.username}
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
          <div className="button-group">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="admin-link">
          <Link to="/forgot-password" style={{ color: '#9cd6ff', textDecoration: 'none' }}>
            Forgot Password?
          </Link>
        </div>
        <div className="admin-link">
          <Link to="/admin-signup" style={{ color: '#00d4ff', textDecoration: 'none' }}>
            Don't have an admin account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
