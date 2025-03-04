const express = require('express');
const router = express.Router();
const bestSellerController = require('../controllers/productController');

router.get('/', bestSellerController.filterBestSellers);

module.exports = router;
