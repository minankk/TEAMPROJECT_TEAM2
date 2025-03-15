const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');
const searchController = require('../controllers/searchController');

// GET - for all products
router.get('/', productsController.getAllProducts);

// GET - Filters by decade
router.get('/decade/:decade', productsController.filterByDecade);

// GET - Filters by price
router.get('/price/:price', productsController.filterByPrice);

// GET - Filters by best-sellers
router.get('/bestsellers', productsController.filterBestSellers);

// GET - Filters for onsale
router.get('/onsale', productsController.filterOnSale);

// GET - Filters by artist
router.get('/artist/:artist', productsController.filterByArtist);

// GET - Filter products by genre (with optional artist filter)
router.get('/genre/:genre', productsController.filterByGenre); // This is the route where both genre and artist can be filtered

// GET - to get the search products
router.get('/search', searchController.searchProducts);

// GET - to get the products by their ID (Whishlist)
router.get('/products/:productId', productsController.getProductById);


module.exports = router;