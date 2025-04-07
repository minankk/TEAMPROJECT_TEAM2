import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResetPasswordPage from './ResetPasswordPage'; // Import the ResetPasswordPage
import './UserProfilePage.css';

const UserProfilePage = () => {
  const [profileData, setProfileData] = useState({ user_name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({ user_name: '', email: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5001/dashboard/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        const responseText = await response.text();
        console.log('Response Text:', responseText); // Log the response text
  
        if (response.status === 200) {
          const data = JSON.parse(responseText); // Parse the response text
          setProfileData(data);
          setUpdatedData(data);
        } else {
          throw new Error(responseText || 'Failed to fetch profile');
        }
      } catch (err) {
        setError(err.message);
      }
    };
  
    fetchProfile();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setMessage('');
    setError('');
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedData(profileData);
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // Assuming your backend route for updating profile is '/dashboard/update'
      const response = await fetch('http://localhost:5001/dashboard/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const data = await response.json();
      setMessage(data.message);
      setProfileData(updatedData);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChangePasswordClick = () => {
    navigate('/reset-password'); // Navigate to the ResetPasswordPage
  };

  if (error) {
    return <div className="profile-container">Error loading profile: {error}</div>;
  }

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      {message && <p className="success-message">{message}</p>}
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="user_name">Username:</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              value={updatedData.user_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={updatedData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="button-group">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
          </div>
        </form>
      ) : (
        <div>
          <p><strong>Username:</strong> {profileData.user_name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <div className="button-group">
            <button onClick={handleEditClick}>Edit Profile</button>
            <button onClick={handleChangePasswordClick}>Change Password</button>
          </div>
        </div>
      )}
      {/* You can choose to render the ResetPasswordPage here directly if you don't want a separate navigation */}
      {/* <ResetPasswordPage /> */}
    </div>
  );
};

export default UserProfilePage;