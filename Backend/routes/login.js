const express = require("express");
const path = require("path"); // Import path module to locate files
const router = express.Router();

// Serve the login page
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../login.html"));
});

module.exports = router;
