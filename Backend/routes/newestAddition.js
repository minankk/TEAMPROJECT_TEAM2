const express = require('express');
const router = express.Router();
const newestAdditionController = require('../controllers/pageController');

router.get('/', newestAdditionController.getNewestAdditions);

module.exports = router;