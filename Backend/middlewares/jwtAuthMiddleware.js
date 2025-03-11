const jwt = require('jsonwebtoken');
const db = require('../db');

const authenticateJWT = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access Denied: No token provided' });
        }

        // Check if token is blacklisted
        const [rows] = await db.execute('SELECT * FROM blacklisted_tokens WHERE token = ?', [token]);
        if (rows.length > 0) {
            return res.status(401).json({ message: 'Access Denied: Token Blacklisted' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();

    } catch (error) {
        console.error('JWT Authentication Error:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticateJWT;



