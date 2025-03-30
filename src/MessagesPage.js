import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './MessagesPage.css';
 
const MessagesPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const isAdmin = token ? jwtDecode(token).role === 'admin' : false;
 
    useEffect(() => {
        if (isAdmin && token) {
            fetchAdminMessages();
        }
    }, [isAdmin, token]);
 
    const fetchAdminMessages = async () => {
        try {
            const response = await fetch('http://localhost:5001/admin/messages/history', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', // Add Content-Type if your backend expects JSON
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
            console.error('Error fetching admin messages:', err);
            setError('Failed to fetch messages.');
        }
    };
 
    const handleSendMessage = async () => {
        try {
            const response = await fetch('http://localhost:5001/admin/messages/send', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ receiverId, message: newMessage }),
            });
 
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to send message: ${response.status} - ${errorData.message || response.statusText}`);
            }
 
            setNewMessage('');
            setReceiverId('');
            fetchAdminMessages();
            setError('');
        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to send message.');
        }
    };
 
    const handleDeleteMessage = async (messageId) => {
        try {
            const response = await fetch(`http://localhost:5001/admin/messages/${messageId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', // You might not need Content-Type for DELETE, but it's good practice to include if your API expects it
                },
            });
 
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to delete message: ${response.status} - ${errorData.message || response.statusText}`);
            }
 
            fetchAdminMessages();
            setError('');
        } catch (err) {
            console.error('Error deleting message:', err);
            setError('Failed to delete message.');
        }
    };
 
    if (!isAdmin) {
        return <div className="messages-page"><h2>Access Denied</h2><p>You do not have permission to view this page.</p></div>;
    }
 
    return (
        <div className="messages-page">
            <h2>Admin Messages</h2>
            {error && <p className="error">{error}</p>}
 
            <div className="message-form">
                <input
                    type="text"
                    placeholder="Receiver ID"
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                />
                <textarea
                    placeholder="Enter message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send Message</button>
            </div>
 
            <ul className="message-list">
                {messages.map((message) => (
                    <li key={message.message_id}>
                        <p><strong>To:</strong> {message.receiver_id}</p>
                        <p>{message.message}</p>
                        <p>Sent at: {new Date(message.sent_at).toLocaleString()}</p>
                        <button onClick={() => handleDeleteMessage(message.message_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
 
export default MessagesPage;