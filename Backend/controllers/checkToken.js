const jwt = require('jsonwebtoken');
const db = require('../db'); 

exports.checkToken = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); 

    if (!token) {
        return res.status(401).json({ loggedIn: false, message: 'Access Denied: No token provided' });
    }

    try {
        const [rows] = await db.execute('SELECT 1 FROM blacklisted_tokens WHERE token = ?', [token]);

        if (rows.length > 0) {
            return res.status(401).json({ loggedIn: false, message: 'Access Denied: Token is blacklisted' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        return res.status(200).json({ loggedIn: true, user: decoded });
    } catch (err) {
        return res.status(403).json({ loggedIn: false, message: 'Invalid or expired token' });
    }
};
