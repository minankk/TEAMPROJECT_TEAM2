import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './UserMessagesPage.css';

const UserMessagesPage = () => {
    const [messages, setMessages] = useState([]);
    const [replyMessage, setReplyMessage] = useState('');
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const userId = token ? jwtDecode(token).user_id : null;

    useEffect(() => {
        fetchUserMessages();
    }, [userId, token]);

    const fetchUserMessages = async () => {
        if (!userId || !token) {
            setError("You must be logged in to view messages.");
            return;
        }
        try {
            const response = await fetch('http://localhost:5001/dashboard/messages', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to fetch messages: ${response.status} - ${errorData.message || response.statusText}`);
            }

            const data = await response.json();
            setMessages(data);
            setError('');
        } catch (err) {
            console.error('Error fetching user messages:', err);
            setError('Failed to fetch messages.');
        }
    };

    const handleReply = async () => {
        if (!selectedMessageId) {
            setError("Please select a message to reply to.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/dashboard/messages/reply', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ parentId: selectedMessageId, message: replyMessage }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to send reply: ${response.status} - ${errorData.message || response.statusText}`);
            }

            setReplyMessage('');
            setSelectedMessageId(null);
            fetchUserMessages();
            setError('');
        } catch (err) {
            console.error('Error replying to message:', err);
            setError('Failed to send reply.');
        }
    };

    const handleMarkAsRead = async (messageId) => {
        try {
            const response = await fetch(`http://localhost:5001/dashboard/messages/read/${messageId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to mark message as read: ${response.status} - ${errorData.message || response.statusText}`);
            }

            fetchUserMessages();
            setError('');
        } catch (err) {
            console.error('Error marking message as read:', err);
            setError('Failed to mark message as read.');
        }
    };

    return (
        <div className="user-messages-page">
            <h2>Messages</h2>
    
            {/* Show error only if it's not due to empty inbox */}
            {error && messages.length === 0 ? (
                <p className="error">{error}</p>
            ) : null}
    
            {messages.length === 0 ? (
                <div className="empty-inbox-message">
                    <p>Your inbox is currently empty.</p>
                    <p>
                        If you need to reach us, please use our{' '}
                        <a href="/contact-us" className="contact-link">Contact Us</a> form.
                    </p>
                </div>
            ) : (
                <ul className="message-list">
                    {messages.map((message) => (
                        <li key={message.message_id}>
                            <p><strong>From:</strong> {message.sender_name}</p>
                            <p>{message.message}</p>
                            <p>Sent at: {new Date(message.sent_at).toLocaleString()}</p>
                            {!message.is_read && (
                                <button onClick={() => handleMarkAsRead(message.message_id)}>Mark as Read</button>
                            )}
                            <button onClick={() => setSelectedMessageId(message.message_id)}>Reply</button>
                            {selectedMessageId === message.message_id && (
                                <div className="reply-section">
                                    <textarea
                                        placeholder="Enter your reply"
                                        value={replyMessage}
                                        onChange={(e) => setReplyMessage(e.target.value)}
                                    />
                                    <button onClick={handleReply}>Send Reply</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default UserMessagesPage;