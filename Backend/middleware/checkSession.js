const checkSession = (req, res, next) => {
    if (req.session.loggedIn) {
        return next(); // If session exists, continue to the next middleware/route
    } else {
        return res.status(401).json({ message: 'Unauthorized. Please log in first.' });
    }
};

module.exports = checkSession;