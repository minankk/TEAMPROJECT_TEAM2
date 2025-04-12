const db = require('../db');

// Send admin message
exports.sendAdminMessage = async (req, res) => {
    try {
        const [adminRows] = await db.query('SELECT * FROM users WHERE user_id = ?', [req.user.user_id]);
        if (adminRows.length === 0) {
            return res.status(403).json({ error: 'You are not authorized to send admin messages.' });
        }

        const { receiverName, message } = req.body;

        if (!receiverName || !message) {
            return res.status(400).json({ error: 'Receiver name and message are required.' });
        }

        const [receiverRows] = await db.query('SELECT user_id FROM users WHERE user_name = ?', [receiverName]);
        if (receiverRows.length === 0) {
            return res.status(404).json({ error: 'Receiver not found.' });
        }

        const receiverId = receiverRows[0].user_id;

        await db.query(
            'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)',
            [req.user.user_id, receiverId, message]
        );

        res.status(201).json({ message: 'Admin message sent successfully.' });
    } catch (error) {
        console.error('Error sending admin message:', error);
        return res.status(500).json({ error: 'Failed to send admin message.' });
    }
};



// Get admin message history
exports.getAdminMessages = async (req, res) => {
    try {
        const [adminRows] = await db.query('SELECT * FROM users WHERE user_id = ?', [req.user.user_id]);
        if (adminRows.length === 0) {
            return res.status(403).json({ error: 'You are not authorized to view messages.' });
        }

        const [messages] = await db.query(
            `SELECT 
                m.*, 
                sender.user_name AS sender_name, 
                receiver.user_name AS receiver_name
            FROM messages m
            JOIN users AS sender ON sender.user_id = m.sender_id
            JOIN users AS receiver ON receiver.user_id = m.receiver_id
            WHERE m.sender_id = ? OR m.receiver_id = ?
            ORDER BY m.sent_at DESC`,
            [req.user.user_id, req.user.user_id]
        );

        res.json(messages);
    } catch (error) {
        console.error('Error fetching admin messages:', error);
        return res.status(500).json({ error: 'Failed to fetch admin messages.' });
    }
};


exports.replyToUserMessage = async (req, res) => {
    try {
        const { message, messageId } = req.body;

        if (!message || !messageId) {
            return res.status(400).json({ error: 'Message and messageId are required.' });
        }
        const [messageRows] = await db.query('SELECT * FROM messages WHERE message_id = ?', [messageId]);
        if (messageRows.length === 0) {
            return res.status(404).json({ error: 'Message not found.' });
        }

        const receiverId = messageRows[0].sender_id; 

        if (!req.user || !req.user.user_id) {
            return res.status(401).json({ error: 'User not authenticated.' });
        }

        await db.query(
            'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)',
            [req.user.user_id, receiverId, message] 
        );

        res.status(201).json({ message: 'Reply sent successfully.' });
    } catch (error) {
        console.error('Error replying to user message:', error);
        return res.status(500).json({ error: 'Failed to send reply.' });
    }
};

// Delete admin message
exports.deleteAdminMessage = async (req, res) => {
    try {
        const [adminRows] = await db.query('SELECT * FROM users WHERE user_id = ?', [req.user.user_id]);
        if (adminRows.length === 0) {
            return res.status(403).json({ error: 'You are not authorized to delete admin messages.' });
        }

        const { messageId } = req.params;

        if (!messageId) {
            return res.status(400).json({ error: 'Message ID is required.' });
        }

        const [messageRows] = await db.query(
            'SELECT * FROM messages WHERE message_id = ? AND sender_id = ?',
            [messageId, req.user.user_id]
        );

        if (messageRows.length === 0) {
            return res.status(404).json({ error: `Message with ID ${messageId} not found or not sent by you.` });
        }

        await db.query(
            'DELETE FROM messages WHERE message_id = ? AND sender_id = ?',
            [messageId, req.user.user_id]
        );

        res.json({ message: 'Message deleted successfully.' });
    } catch (error) {
        console.error('Error deleting admin message:', error);
        return res.status(500).json({ error: 'Failed to delete admin message.' });
    }
};

