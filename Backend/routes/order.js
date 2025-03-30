const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// POST /orders (Create a new order)
router.post('/', orderController.checkoutAndCreateOrder);

// GET /orders/:userId (Get order history for a user)
router.get('/:userId', orderController.getOrderHistory);

// PUT /admin/orders/status (Update order status - admin only)
router.put('/admin/orders/status', orderController.updateOrderStatus);

module.exports = router;