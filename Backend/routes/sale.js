const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');
 
// Get records by genre
router.get('/:genreId', saleController.getRecordsByGenre);
 
// Get details of a specific record
router.get('/record/:id', saleController.getRecordById);
 
module.exports = router;