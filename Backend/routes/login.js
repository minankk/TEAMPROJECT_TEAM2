
const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/authController');

//login route
router.post('/', loginControllers.login);

module.exports = router;

