
const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/authController');

router.post('/', loginControllers.login);

module.exports = router;

