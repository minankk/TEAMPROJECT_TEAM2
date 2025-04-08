// routes/revenueRoutes.js

const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenueController');

// GET /revenue/total-revenue
router.get('/total-revenue', revenueController.getTotalRevenue);

// GET /revenue/discounts-applied
router.get('/discounts-applied', revenueController.getDiscountsApplied);

module.exports = router;