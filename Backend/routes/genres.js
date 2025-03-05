const express = require('express');
const router = express.Router();
const genreController = require('../controllers/productController');

router.get('/:genre', genreController.filterByGenre);

module.exports = router;
