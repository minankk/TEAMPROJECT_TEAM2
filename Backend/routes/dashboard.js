const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

//dashboard message
router.get('/', dashboardController.viewDashboard);

//get profile info
router.get('/profile', dashboardController.getProfile);

//update the profile info
router.put('/update', dashboardController.updateProfile);

//to change password
router.post('/change-password', dashboardController.changePassword);

// Display order tracking information
router.get('/order/track/:trackingNumber', dashboardController.viewOrderTracking);

// User-only routes (dashboard related)
router.get('/messages', dashboardController.getUserMessages);
router.post('/messages/reply', dashboardController.replyToMessage);
router.put('/messages/read/:messageId', dashboardController.markMessageAsRead);


// order history
router.get('/order-history', dashboardController.getOrderHistory);

module.exports = router;
