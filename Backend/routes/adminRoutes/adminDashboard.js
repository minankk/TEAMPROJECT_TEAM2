const express = require('express');
const router = express.Router();
const adminDashboardController = require('../../controllers/adminDashboardController');

//report 
router.get('/sales-report', adminDashboardController.getSalesReport);

router.get('/user-activity-report', adminDashboardController.getUserActivityReport);

router.get('/product-report', adminDashboardController.getProductReport);



// GET /admin/dashboard (Get dashboard data including reports and products)
router.get('/',  adminDashboardController.getDashboardData);
router.get('/products', adminDashboardController.getAllProducts);


// Product Management Endpoints (within the dashboard)
router.post('/products', adminDashboardController.addProduct);
router.put('/products/:id',  adminDashboardController.updateProduct);
router.delete('/products/:id', adminDashboardController.deleteProduct);
router.put('/orders/:order_id/cancel', adminDashboardController.cancelOrder);


module.exports = router;