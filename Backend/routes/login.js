const express = require("express");
const router = express.Router();

// Hardcoded user credentials for login validation
const validUsername = "testUser";
const validPassword = "test123";

// Handling a POST request to the /login route
router.post("/login", (req, res) => {
    const { username, password } = req.body;
  
     // Validate if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

    // Validating the login credentials
    if (username === validUsername && password === validPassword) {
      // For successful login
      res.status(200).json({ message: "Login successful!" });
    } else {
      // Invalid login
      res.status(401).json({ message: "Invalid username or password!" });
    }
  });
  
  module.exports = router;