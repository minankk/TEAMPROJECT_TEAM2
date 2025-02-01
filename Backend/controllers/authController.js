const users = require('../data/mockData');

exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.loggedIn = true;
        req.session.username = username;
        return res.status(200).json({ message: 'Login successful', username });
    } else {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send('Could not log out');
        res.redirect('/');
    });
};
