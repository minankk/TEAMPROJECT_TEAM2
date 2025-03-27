import React, { useState } from 'react';
import axios from 'axios';
import './NewsletterPage.css';

const NewsletterPage = () => {
    const [email, setEmail] = useState('');
    const [preferences, setPreferences] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePreferenceChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setPreferences([...preferences, value]);
        } else {
            setPreferences(preferences.filter(pref => pref !== value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (preferences.length === 0) {
            setError("Please select at least one preference.");
            return;
        }

        try {
            // Check if user is logged in to get user_id
            const token = localStorage.getItem('token');
            let user_id = null;
            if (token) {
                try {
                    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Basic JWT decode
                    user_id = decodedToken.user_id;
                } catch (decodeError) {
                    console.error("Error decoding token:", decodeError);
                    setError("Error processing request. Please try again.");
                    return;
                }
            }

            const payload = {
                email: email,
                preferences: preferences,
            };

            if (user_id) {
                payload.user_id = user_id;
            }

            const response = await axios.post('http://localhost:5001/newsletter', payload);
            setMessage(response.data.message);
            setEmail('');
            setPreferences([]);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Failed to subscribe. Please try again.');
            }
        }
    };

    return (
        <div className="newsletter-page">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Stay updated with our latest news and offers.</p>

            <form onSubmit={handleSubmit} className="newsletter-form">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <div className="preferences-section">
                    <label>
                        <input
                            type="checkbox"
                            value="news"
                            checked={preferences.includes("news")}
                            onChange={handlePreferenceChange}
                        />
                        News
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="offers"
                            checked={preferences.includes("offers")}
                            onChange={handlePreferenceChange}
                        />
                        Offers
                    </label>
                    {/* Add more preferences as needed */}
                </div>

                <button type="submit">Subscribe</button>
            </form>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default NewsletterPage;