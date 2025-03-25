const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authJWT = require('../middlewares/jwtAuthMiddleware'); // Assuming you need auth for order history

// POST /orders (Create a new order)
router.post('/', authJWT.authenticateJWT, orderController.createOrder);

// GET /orders/:userId (Get order history for a user)
router.get('/:userId', authJWT.authenticateJWT, orderController.getOrderHistory);

// PUT /admin/orders/status (Update order status - admin only)
router.put('/admin/orders/status', authJWT.authenticateJWT, authJWT.verifyAdmin, orderController.updateOrderStatus);

module.exports = router;