import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
            const response = await axios.get('http://localhost:5001/dashboard/messages', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages(response.data);
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
            await axios.post(
                'http://localhost:5001/dashboard/messages/reply',
                { parentId: selectedMessageId, message: replyMessage },
                { headers: { Authorization: `Bearer ${token}` } }
            );
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
            await axios.put(
                `http://localhost:5001/dashboard/messages/read/${messageId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
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
            {error && <p className="error">{error}</p>}

            <ul className="message-list">
                {messages.map((message) => (
                    <li key={message.message_id}>
                        <p><strong>From:</strong> {message.sender_id}</p>
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
        </div>
    );
};

export default UserMessagesPage;