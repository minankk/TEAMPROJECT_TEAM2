const users = require('../data/mockData');
const db = require('../db')
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    const { username, password } = req.body;

     // Validation checks
     if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check password length
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Query the database for the user
    const query = 'SELECT * FROM users WHERE user_name = ? AND password = ?';
    
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length > 0) {
          const user = results[0];
            // User found, set session variables
            req.session.loggedIn = true;
            req.session.username = user.user_name;
            req.session.user_id = user.user_id;
            req.session.role = user.role;

            return res.status(200).json({ 
                message: 'Login successful', 
                user: { username: user.user_name }
            });
        } else {
            console.log("Invalid login attempt");
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    });
};

/*exports.login = (req, res) => {
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
  };*/

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
