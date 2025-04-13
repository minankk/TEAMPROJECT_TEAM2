import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './MessagesPage.css';
 
const MessagesPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [replyMessages, setReplyMessages] = useState({}); 
    const [messageId, setMessageId] = useState('');
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
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch messages: ${response.status} - ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        setMessages(data);
    } catch (err) {
        console.error('Error fetching messages:', err);
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
                body: JSON.stringify({
                    receiverName: receiverId, 
                    message: newMessage
                }),
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

    const handleReply = async (messageId) => {
        try {
            const response = await fetch('http://localhost:5001/admin/messages/reply', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: replyMessages[messageId], // Use the replyMessages object
                    messageId: messageId,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to send reply: ${response.status} - ${errorData.message || response.statusText}`);
            }
    
            setReplyMessages(prevState => {
                const newState = { ...prevState };
                delete newState[messageId]; // Clear the reply input after sending
                return newState;
            });
            fetchAdminMessages();
        } catch (err) {
            console.error('Error sending reply:', err);
        }
    };
    
    
    
    const handleDeleteMessage = async (messageId) => {
        try {
            const response = await fetch(`http://localhost:5001/admin/messages/delete/${messageId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
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
                    placeholder="Receiver Name"
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
    {messages.length > 0 ? (
        messages.map((message) => (
            <li key={message.message_id}>
                <p><strong>From:</strong> {message.sender_name}</p>
                <p><strong>To:</strong> {message.receiver_name}</p>
                <p>{message.message}</p>
                <p><strong>Sent at:</strong> {new Date(message.sent_at).toLocaleString()}</p>

                <div className="reply-section">
                    <textarea
                        placeholder="Reply to this message"
                        value={replyMessages[message.message_id] || ''}
                        onChange={(e) => setReplyMessages({
                            ...replyMessages,
                            [message.message_id]: e.target.value
                        })}
                    />
                    <button onClick={() => handleReply(message.message_id)}>Send Reply</button>
                </div>

                {message.sender_id === jwtDecode(token).user_id && (
                    <button className="delete-btn" onClick={() => handleDeleteMessage(message.message_id)}>Delete</button>
                )}
            </li>
        ))
    ) : (
        <p>No messages available.</p>
    )}
</ul>

        </div>
    );
    
    
};
 
export default MessagesPage;