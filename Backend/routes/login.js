const express = require("express");
const router = express.Router();

//Importing the mock data from data folder
const users = require('../data/mockData');

// Handling a POST request to the /login route
router.post('/', (req, res) => {
    const { username, password } = req.body;

// Check if username and password match any user
const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    return res.status(200).json({ message: 'Login successful', username });
  } else {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;