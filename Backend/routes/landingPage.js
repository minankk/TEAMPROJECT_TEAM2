const express = require('express');
const router = express.Router();
const { landingPage, dashboard} = require('../controllers/pageController');

router.get('/', landingPage); 
router.get('/dashboard', dashboard); 

module.exports = router;

    