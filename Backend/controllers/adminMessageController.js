const db = require('../db');
const jwt = require('jsonwebtoken');

/*

// Send admin message
exports.sendAdminMessage = async (req, res) => {
    try {
        const { receiverId, message } = req.body;

        if (!receiverId || !message) {
            return res.status(400).json({ error: 'Receiver ID and message are required.' });
        }

        await db.query(
            'INSERT INTO messages (sender_id, receiver_id, message, is_admin_message) VALUES (?, ?, ?, ?)',
            [req.user.user_id, receiverId, message, true]
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
        const [messages] = await db.query(
            'SELECT * FROM messages WHERE sender_id = ? AND is_admin_message = TRUE ORDER BY sent_at DESC',
            [req.user.user_id]
        );
        res.json(messages);
    } catch (error) {
        console.error('Error fetching admin messages:', error);
        return res.status(500).json({ error: 'Failed to fetch admin messages.' });
    }
};

// Delete admin message
exports.deleteAdminMessage = async (req, res) => {
    try {
        const { messageId } = req.params;

        if (!messageId) {
            return res.status(400).json({ error: 'Message ID is required.' });
        }

        await db.query('DELETE FROM messages WHERE message_id = ? AND sender_id = ? AND is_admin_message = TRUE', [
            messageId,
            req.user.user_id,
        ]);

        res.json({ message: 'Admin message deleted successfully.' });
    } catch (error) {
        console.error('Error deleting admin message:', error);
        return res.status(500).json({ error: 'Failed to delete admin message.' });
    }
};

*/

// Edit admin message (implement if needed)
// exports.editAdminMessage = async (req, res) => { ... };

// Send admin message
exports.sendAdminMessage = async (req, res) => {
    try {
        // Check admin privileges (example: retrieve privileges from admin table)
        const [adminRows] = await db.query('SELECT * FROM admins WHERE user_id = ?', [req.user.user_id]);
        if (adminRows.length === 0) {
            return res.status(403).json({ error: 'You are not authorized to send admin messages.' });
        }

        const { receiverId, message } = req.body;

        if (!receiverId || !message) {
            return res.status(400).json({ error: 'Receiver ID and message are required.' });
        }

        await db.query(
            'INSERT INTO messages (sender_id, receiver_id, message, is_admin_message) VALUES (?, ?, ?, ?)',
            [req.user.user_id, receiverId, message, true]
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
        // Check admin privileges (example: retrieve privileges from admin table)
        const [adminRows] = await db.query('SELECT * FROM admins WHERE user_id = ?', [req.user.user_id]);
        if (adminRows.length === 0) {
            return res.status(403).json({ error: 'You are not authorized to view admin messages.' });
        }

        const [messages] = await db.query(
            'SELECT * FROM messages WHERE sender_id = ? AND is_admin_message = TRUE ORDER BY sent_at DESC',
            [req.user.user_id]
        );
        res.json(messages);
    } catch (error) {
        console.error('Error fetching admin messages:', error);
        return res.status(500).json({ error: 'Failed to fetch admin messages.' });
    }
};

// Delete admin message
exports.deleteAdminMessage = async (req, res) => {
    try {
        // Check admin privileges (example: retrieve privileges from admin table)
        const [adminRows] = await db.query('SELECT * FROM admins WHERE user_id = ?', [req.user.user_id]);
        if (adminRows.length === 0) {
            return res.status(403).json({ error: 'You are not authorized to delete admin messages.' });
        }

        const { messageId } = req.params;

        if (!messageId) {
            return res.status(400).json({ error: 'Message ID is required.' });
        }

        // Check if the message exists
        const [messageRows] = await db.query('SELECT * FROM messages WHERE message_id = ? AND sender_id = ? AND is_admin_message = TRUE', [messageId, req.user.user_id]);
        if (messageRows.length === 0) {
            return res.status(404).json({ error: `Admin message with id ${messageId} not found.` });
        }

        await db.query('DELETE FROM messages WHERE message_id = ? AND sender_id = ? AND is_admin_message = TRUE', [
            messageId,
            req.user.user_id,
        ]);

        res.json({ message: 'Admin message deleted successfully.' });
    } catch (error) {
        console.error('Error deleting admin message:', error);
        return res.status(500).json({ error: 'Failed to delete admin message.' });
    }
};

// Edit admin message (implement if needed)
// exports.editAdminMessage = async (req, res) => { ... };