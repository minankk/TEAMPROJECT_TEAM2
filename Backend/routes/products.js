const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');
const searchController = require('../controllers/searchController');


// GET - for all products
router.get('/', productsController.getAllProducts);

/*// GET /api/products/filter/genre/:genre - Filter products by genre
router.get('/filter/genre/:genre', productsController.filterByGenre);

// GET /api/products/filter/decade/:decade - Filter products by decade
router.get('/filter/decade/:decade', productsController.filterByDecade);

// GET /api/products/filter/best-sellers - Filter best sellers
router.get('/filter/best-sellers', productsController.filterBestSellers);

// GET /api/products/filter/sale - Filter products on sale
router.get('/filter/sale', productsController.filterOnSale);

// GET /api/products/filter/artist/:artist - Filter products by artist
router.get('/filter/artist/:artist', productsController.filterByArtist);*/

// to get the search products
router.get('/search', searchController.searchProducts);



module.exports = router;