import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminLoginPage.css'; // Import CSS for styling

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
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
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    if (!trimmedData.email || !trimmedData.password) {
      setError('Please fill in all fields.');
      return;
    }

    console.log('Admin Login Form Data:', trimmedData);

    try {
      const response = await fetch('http://localhost:5001/admin/login', { // Adjust your API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimmedData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Admin Login Successful:', data);
        localStorage.setItem('token', data.token);
        // Redirect to the admin dashboard or a protected admin area
        // I will add the admin dashboard logic once we're ready to add it
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
