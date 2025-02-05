
const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/authController');

router.post('/', loginControllers.login);

module.exports = router;

/*const express = require("express");
const path = require("path"); // Import path module to locate files
const router = express.Router();

// Serve the login page
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../login.html"));
});

module.exports = router;*/
