const express = require('express');
const router = express.Router();
const contactUsController = require('../controllers/userController');

router.post('/' , contactUsController.contact_us);

module.exports = router;
