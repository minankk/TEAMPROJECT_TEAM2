const db = require('../db')

// This route checks if the user is logged in
exports.checkSession = (req, res) => {
    if (req.session.loggedIn) {
        return res.status(200).json({ loggedIn: true });
    } else {
        return res.status(200).json({ loggedIn: false });
    }
};