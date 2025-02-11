const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/checkSession');

router.get('/', sessionController.checkSession);

module.exports = router;