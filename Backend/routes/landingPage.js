const express = require('express');
const router = express.Router();
const { landingPage, dashboard, loginPage } = require('../controllers/pageController');

router.get('/', landingPage); // Landing page API
router.get('/login', loginPage); // Login page API
router.get('/dashboard', dashboard); // Dashboard page API

module.exports = router;

