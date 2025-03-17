const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateJWT = require('../middlewares/jwtAuthMiddleware');

// POST /orders (Create a new order)
router.post('/', authenticateJWT, orderController.createOrder);

// GET /orders/:userId (Get order history for a user)
router.get('/:userId', authenticateJWT, orderController.getOrderHistory);

// PUT /orders/status (Update order status - admin only)
router.put('/status', authenticateJWT, orderController.updateOrderStatus);

module.exports = router;