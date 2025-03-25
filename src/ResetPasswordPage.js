// ResetPasswordPage.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ResetPasswordPage.css'; // Import the CSS

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token'); // Get token from URL query params

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!password || !confirmPassword) {
            setError('Please enter both password and confirm password.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/',  { // Replace with your backend URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword: password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                // Redirect to login or home after successful reset
                setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
            } else {
                setError(data.message || 'An error occurred.');
            }
        } catch (err) {
            setError('Failed to connect to the server.');
            console.error('Error resetting password:', err);
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-box">
                <h2>Reset Password</h2>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <label>New Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="reset-password-button">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;