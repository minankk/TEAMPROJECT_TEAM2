const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('/', salesController.getSalesProducts);

module.exports = router;
