const express = require('express');
const router = express.Router();
const resetPasswordController = require('../controllers/authController');

//forgot password route
router.post('/', resetPasswordController.resetPassword);

module.exports = router;