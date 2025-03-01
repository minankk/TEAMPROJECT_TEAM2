const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');

// GET /products - Get all products
router.get('/', productsController.getAllProducts);

// GET /products/filter/genre/:genre - Filter products by genre
router.get('/filter/genre/:genre', productsController.filterByGenre);

// GET /products/filter/decade/:decade - Filter products by decade
router.get('/filter/decade/:decade', productsController.filterByDecade);

// GET /products/filter/best-sellers - Filter best sellers
router.get('/filter/best-sellers', productsController.filterBestSellers);

// GET /products/filter/sale - Filter products on sale
router.get('/filter/sale', productsController.filterOnSale);

// GET /products/filter/artist/:artist - Filter products by artist
router.get('/filter/artist/:artist', productsController.filterByArtist);

module.exports = router;