// routes/products.js
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');

// GET /api/products - Get all products
router.get('/', productsController.getProducts);

module.exports = router;
