const express = require('express');
const router = express.Router();
const adminMessageController = require('../controllers/adminMessageController');
const jwt = require('jsonwebtoken');

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authentication required.' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded;
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Admin privileges required.' });
        }
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ error: 'Invalid token.' });
    }
};

// Admin-only routes
router.post('/send', verifyAdmin, adminMessageController.sendAdminMessage);
router.get('/history', verifyAdmin, adminMessageController.getAdminMessages);
router.delete('/:messageId', verifyAdmin, adminMessageController.deleteAdminMessage);

module.exports = router;