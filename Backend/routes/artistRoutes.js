const express = require('express');
const router = express.Router();
const artistController = require('../controllers/pageController');

router.get('/', artistController.getArtists);

module.exports = router;