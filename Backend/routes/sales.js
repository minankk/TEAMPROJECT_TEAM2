// routes/sales.js
const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

// When a GET request is made to /sales, call the getSalesProducts controller.
router.get('/', salesController.getSalesProducts);

module.exports = router;
