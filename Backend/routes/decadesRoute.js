const express = require('express');
const router = express.Router();
const decadesController = require('../controllers/decadesController');

router.get('/', decadesController.getProductsByDecade);

module.exports = router;