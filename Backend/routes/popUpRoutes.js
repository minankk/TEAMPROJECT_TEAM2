// routes/popUpRoutes.js

const express = require('express');
const router = express.Router();
const popUpController = require('../controllers/popUpControllers'); // Correct path

// API endpoint to get pop-up information
router.get('/', popUpController.getPopUpInfo);

module.exports = router;    