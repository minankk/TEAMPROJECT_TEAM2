const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pageController');


router.get('/', pagesController.landingPage); 
router.get('/dashboard', pagesController.dashboard); 



module.exports = router;

    