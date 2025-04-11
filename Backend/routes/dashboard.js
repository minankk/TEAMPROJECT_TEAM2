const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticateJWT } = require('../middlewares/jwtAuthMiddleware'); // Make sure the path to your middleware is correct

//dashboard message
router.get('/', authenticateJWT, dashboardController.viewDashboard);

//get profile info
router.get('/profile', authenticateJWT, dashboardController.getProfile);

//update the profile info
router.put('/profile/update', dashboardController.updateProfile);

//to change password
router.post('/profile/change-password', dashboardController.changePassword);

// Display order tracking information
router.get('/order/track/:trackingNumber', dashboardController.viewOrderTracking);

// User-only routes (dashboard related)
router.get('/messages', dashboardController.getUserMessages);
router.post('/messages/reply', dashboardController.replyToMessage);
router.put('/messages/read/:messageId', dashboardController.markMessageAsRead);


// order history
router.get('/order-history', dashboardController.getOrderHistory);

module.exports = router;