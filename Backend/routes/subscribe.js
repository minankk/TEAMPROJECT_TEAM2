const express = require('express');
const router = express.Router();
const subscribeController = require('../controllers/subscriberController');

// Route for subscribing sends confirmation email
router.post('/', subscribeController.subscribe);

// Route for confirming subscription
router.get("/confirm/:token", subscribeController.confirmSubscription);

// Unsubscribe the users
router.delete("/unsubscribe", subscribeController.unsubscribe);

module.exports = router;