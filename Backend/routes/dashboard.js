const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/userController');


router.get('/', dashboardController.viewDashboard);

//router.post('/change-password', changePassword);

module.exports = router;
