const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');
const searchController = require('../controllers/searchController');


// GET - for all products
router.get('/', productsController.getAllProducts);

//GET - Filters by decade
router.get('/decade/:decade', productsController.filterByDecade);

//get - Filters by price
router.get('/price/:price', productsController.filterByPrice);

//get - Filters by best-sellers
router.get('/bestsellers', productsController.filterBestSellers);

//get - Filters for onsale
router.get('/onsale', productsController.filterOnSale);

//router.get('/genre/:genre', productsController.filterByGenre);



// GET /api/products/filter/genre/:genre - Filter products by genre
//router.get('/filter/genre/:genre', productsController.filterByGenre);

// GET /api/products/filter/artist/:artist - Filter products by artist
//router.get('/filter/artist/:artist', productsController.filterByArtist);

// to get the search products
router.get('/search', searchController.searchProducts);



module.exports = router;