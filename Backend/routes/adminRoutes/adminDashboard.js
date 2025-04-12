const express = require('express');
const router = express.Router();
const adminDashboardController = require('../../controllers/adminDashboardController');

//report -sales
router.get('/sales-report', adminDashboardController.getSalesReport);

//report -user-activity
router.get('/user-activity-report', adminDashboardController.getUserActivityReport);

//report - product report
router.get('/product-report', adminDashboardController.getProductReport);

//report - order report
router.get('/order-report', adminDashboardController.getOrderReport);

//cancel order
router.delete('/orders/cancel/:orderId', adminDashboardController.cancelOrder);


// GET /admin/dashboard (Get dashboard data including reports and products)
router.get('/',  adminDashboardController.getDashboardData);
router.get('/products', adminDashboardController.getAllProducts);


// Product Management Endpoints (within the dashboard)
router.post('/products', adminDashboardController.addProduct);
router.put('/products/:id',  adminDashboardController.updateProduct);
router.delete('/products/:id', adminDashboardController.deleteProduct);



module.exports = router;