const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController.js');

router.get('/', artistController.getAllArtists);
router.get('/:artistId', artistController.getArtistById);

module.exports = router;