const express = require('express');
const router = express.Router();
const adminDashboardController = require('../../controllers/adminDashboardController');
const authJWT = require('../../middlewares/jwtAuthMiddleware'); // Correct import

// GET /admin/dashboard (Get dashboard data including reports and products)
router.get('/', authJWT.authenticateJWT, authJWT.verifyAdmin, adminDashboardController.getDashboardData);

// Product Management Endpoints (within the dashboard)
router.post('/products', authJWT.authenticateJWT, authJWT.verifyAdmin, adminDashboardController.addProduct);
router.put('/products/:id', authJWT.authenticateJWT, authJWT.verifyAdmin, adminDashboardController.updateProduct);
router.delete('/products/:id', authJWT.authenticateJWT, authJWT.verifyAdmin, adminDashboardController.deleteProduct);
router.put('/orders/:order_id/cancel', authJWT.authenticateJWT, authJWT.verifyAdmin, adminDashboardController.cancelOrder);


module.exports = router;