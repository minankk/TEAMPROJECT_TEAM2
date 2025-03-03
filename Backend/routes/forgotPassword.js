const express = require('express');
const router = express.Router();
const forgotPasswordController = require('../controllers/authController');

//forgot password route
router.post('/', forgotPasswordController.forgotPassword);

module.exports = router;