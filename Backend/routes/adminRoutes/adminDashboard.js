const express = require('express');
const router = express.Router();
const adminDashboardController = require('../../controllers/adminDashboardController');

// admin - dashboard -> overview
router.get('/',  adminDashboardController.getDashboardData);

/**
 * Analytics section
 */

//report -sales
router.get('/sales-report', adminDashboardController.getSalesReport);

//report -user-activity
router.get('/user-activity-report', adminDashboardController.getUserActivityReport);

//report - product report
router.get('/product-report', adminDashboardController.getProductReport);

/**
 * Order Management
 */

//report - order report
router.get('/order-report', adminDashboardController.getOrderReport);

//cancel order
router.delete('/orders/cancel/:orderId', adminDashboardController.cancelOrder);


/**
 * Product Management
 */

//view all products
router.get('/products', adminDashboardController.getAllProducts);

//add a product
router.post('/add/products', adminDashboardController.addProduct);

//update a product
router.put('/update/products/:id',  adminDashboardController.updateProduct);


router.delete('/delete/products/:id', adminDashboardController.deleteProduct);



module.exports = router;