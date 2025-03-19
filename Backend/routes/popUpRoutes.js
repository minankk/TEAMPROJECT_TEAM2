// routes/popUpRoutes.js
const express = require('express');
const router = express.Router();
const popUpController = require('../controllers/popUpControllers');
 
router.get('/:id', popUpController.getPopUpInfo);
 
module.exports = router; 