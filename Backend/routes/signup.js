const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // uuid package for generating user IDs
const moment = require('moment'); // moment package for date manipulation
const bcrypt = require('bcrypt'); // bcrypt package for password hashing

// Import mock data (if needed)
const users = require('./data/mockData');

// Signup route
router.post('/signup', async (req, res) => {
  const { userName, email, password, phone_num, role } = req.body;

  // Check if all required fields are present
  if (!userName || !email || !password || !phone_num || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user object
  const newUser = {
    user_id: uuidv4(), // Generate a unique ID
    userName,
    email,
    password: hashedPassword, // Save the hashed password
    phone_num,
    role,
    createdAt: moment().format(), // User creation date
  };

  // Add the new user to the mock data
  users.push(newUser);

  // Return the new user's information in the response
  return res.status(201).json({
    message: 'User successfully created',
    user: {
      user_id: newUser.user_id,
      userName: newUser.userName,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    },
  });
});


/* defined and should be defined in app.js
// Apply the router to the Express application (add to app.js or server.js)
const app = express();
app.use(express.json()); // Parse JSON formatted request bodies

// Set up the signup route
app.use('/api', router);

// Set the server to listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

*/