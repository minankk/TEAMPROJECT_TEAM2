const express = require("express");
const router = express.Router();

//Importing the mock data from data folder
const users = require('../data/mockData');

/**
 * Handling the GET request to render the login page
 * NEED TO MODIFY LATER (only for testing)
 */

router.get('/', (req, res) => {
  res.send('User is in Login page');
});

/**
 * Handling a POST request to the /login route
 */

router.post('/', (req, res) => {
    const { username, password } = req.body;
// Check if username and password match any user
const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // Set the session to indicate the user is logged in
    req.session.loggedIn = true;
    req.session.username = username;
    
    return res.status(200).json({ message: 'Login successful', username });
  } else {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
});



module.exports = router;
