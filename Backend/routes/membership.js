const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');

//redirect to payment gateway
router.post('/payment-gateway', membershipController.redirectToPaymentGateway);

//process payment
router.post('/process-payment', membershipController.processPayment);

//checkout as VIP member
router.post('/checkoutAsVIP', membershipController.checkoutAsVIP);

module.exports = router;
