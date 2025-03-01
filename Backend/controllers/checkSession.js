const db = require('../db')

exports.checkSession = (req, res) => {
    res.status(200).json({ loggedIn: true, user: req.user });
};
