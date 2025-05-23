const jwt = require('jsonwebtoken');
const db = require('../db');

const authenticateJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("authenticateJWT: Received authHeader:", authHeader);

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log("authenticateJWT: No or invalid authHeader");
            return res.status(401).json({ message: 'Access Denied: No token provided or invalid format' });
        }

        const token = authHeader.split(' ')[1];
        console.log("authenticateJWT: Extracted token:", token);

        const [rows] = await db.execute('SELECT 1 FROM blacklisted_tokens WHERE token = ?', [token]);
        if (rows.length > 0) {
            console.log("authenticateJWT: Token blacklisted");
            return res.status(401).json({ message: 'Access Denied: Token Blacklisted' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("authenticateJWT: Decoded token:", decoded);

        if (!decoded || !decoded.user_id) {
            console.log("authenticateJWT: Invalid token: user_id missing");
            return res.status(401).json({ message: 'Invalid token: user_id is missing' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error('authenticateJWT: JWT Authentication Error:', error);
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