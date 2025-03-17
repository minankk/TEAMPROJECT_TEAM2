const express = require('express');
const router = express.Router();
const subscribeController = require('../controllers/subscriberController');

router.post('/', subscribeController.subscribe);

module.exports = router;