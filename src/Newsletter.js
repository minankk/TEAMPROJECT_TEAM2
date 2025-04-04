import React, { useState } from 'react';
import './NewsLetter.css';

const NewsletterPage = () => {
    const [email, setEmail] = useState('');
    const [preferences, setPreferences] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state

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
        setLoading(true); // Start loading

        if (preferences.length === 0) {
            setError("Please select at least one preference.");
            setLoading(false); // Stop loading
            return;
        }

        try {
            const token = localStorage.getItem('token');
            let user_id = null;
            if (token) {
                try {
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    user_id = decodedToken.user_id;
                } catch (decodeError) {
                    console.error("Error decoding token:", decodeError);
                    setError("Invalid login session. Please log in again.");
                    setLoading(false); // Stop loading
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

            const response = await fetch('http://localhost:5001/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to subscribe. Please try again.');
            }

            const data = await response.json();
            setMessage(data.message);
            setEmail('');
            setPreferences([]);
        } catch (err) {
            setError(err.message || 'Failed to subscribe. Please try again.');
        } finally {
            setLoading(false); // Stop loading
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

                <button type="submit" disabled={loading}>
                    {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
            </form>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default NewsletterPage;