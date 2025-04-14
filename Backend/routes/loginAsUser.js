
const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/authController');

//login route
router.post('/', loginControllers.loginUser);

module.exports = router;

