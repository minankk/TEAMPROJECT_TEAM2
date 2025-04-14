const express = require('express');
const router = express.Router();
const authControllers = require('../../controllers/authController');

router.post('/login', authControllers.loginAdmin);


module.exports = router;