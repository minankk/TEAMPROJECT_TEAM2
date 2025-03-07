const jwt = require('jsonwebtoken');
const db = require('../db');

const authenticateJWT = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    try {
        const [rows] = await db.execute('SELECT * FROM blacklisted_tokens WHERE token = ?', [token]);
        if (rows.length > 0) {
            return res.status(401).json({ message: 'Access Denied: Token Blacklisted' });
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        console.error('Error during JWT authentication:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = authenticateJWT;


