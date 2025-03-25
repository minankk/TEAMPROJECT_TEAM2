const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');
const searchController = require('../controllers/searchController');

// for all products
router.get('/', productsController.getAllProducts);

// Filters by decade
router.get('/decade/:decade', productsController.filterByDecade);

// Filters by price
router.get('/price/:price', productsController.filterByPrice);

// Filters by best-sellers
router.get('/bestsellers', productsController.filterBestSellers);

// Filters for onsale
router.get('/onsale', productsController.filterOnSale);

//Filters by artist
router.get('/artist/:artist', productsController.filterByArtist);

//Filter products by genre
router.get('/genre/:genre', productsController.filterByGenre); 

// Filter by multiple products 
router.get('/multiplefilter', productsController.multipleFliteredProducts);

// To get the search products
router.get('/search', searchController.searchProducts);

//to get the products by their ID (Whishlist)
router.get('/products/:productId', productsController.getProductById);


module.exports = router;