const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/checkToken');

router.get('/', tokenController.checkToken);

module.exports = router;
