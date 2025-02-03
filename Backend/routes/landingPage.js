const express = require('express');
const router = express.Router();
const { landingPage } = require('../controllers/pageController');

router.get('/', landingPage);
module.exports = router;
