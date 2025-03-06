const jwt = require('jsonwebtoken');

exports.checkSession = (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ loggedIn: false, message: 'Access Denied: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ loggedIn: false, message: 'Invalid or expired token' });
        }

        res.status(200).json({ loggedIn: true, user });
    });
};
