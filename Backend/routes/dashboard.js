const express = require('express');
const router = express.Router();
const { dashboard } = require('../controllers/pageController');

router.get('/', dashboard);
module.exports = router;
