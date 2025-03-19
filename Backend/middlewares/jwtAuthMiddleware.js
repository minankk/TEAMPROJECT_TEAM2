const jwt = require('jsonwebtoken');
const db = require('../db');

const authenticateJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access Denied: No token provided' });
        }

        const token = authHeader.split(' ')[1];

        const [rows] = await db.execute('SELECT 1 FROM blacklisted_tokens WHERE token = ?', [token]);
        if (rows.length > 0) {
            return res.status(401).json({ message: 'Access Denied: Token Blacklisted' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        if (!decoded || !decoded.user_id) {
            return res.status(401).json({ message: 'Invalid token: user_id is missing' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT Authentication Error:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please log in again.' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const verifyAdmin = async (req, res, next) => {
    try {
        if (!req.user || !req.user.user_id) {
            return res.status(403).json({ message: 'Forbidden: No user found or invalid token' });
        }

        const [user] = await db.execute('SELECT role FROM users WHERE user_id = ?', [req.user.user_id]);

        if (!user || user.length === 0 || user[0].role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admin access required' });
        }

        next();
    } catch (error) {
        console.error('Admin Verification Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { authenticateJWT, verifyAdmin };