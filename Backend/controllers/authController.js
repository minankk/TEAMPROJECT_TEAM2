const users = require('../data/mockData');

exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.loggedIn = true;
        req.session.username = username;
    // Return success response
    return res.status(200).json({ 
        message: 'Login successful', 
        user: { username: user.username },
      });
    } else {
      console.log("Invalid login attempt"); 
    // Return error response
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  };

exports.logout = (req, res) => {
    // Destroy the session
    req.session.loggedIn = false;
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out' });
        }
        
    // Return success response
    res.status(200).json({ message: 'Logout successful' });
    });
};
