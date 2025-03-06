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

//get - Filters for onsale 
router.get('/artist/:artist', productsController.filterByArtist);

// get - Filter products by genre
router.get('/genre/:genre', productsController.filterByGenre);

// to get the search products
router.get('/search', searchController.searchProducts);

//to get the products by their ID(Whishlist)
router.get('/products/:productId', productsController.getProductById); 

module.exports = router;