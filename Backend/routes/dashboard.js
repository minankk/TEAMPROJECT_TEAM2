const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

//dashboard message
router.get('/', dashboardController.viewDashboard);

//get profile info
router.get('/profile', dashboardController.getProfile);

//update the profile info
router.put('/update', dashboardController.updateProfile);



//router.post('/change-password', changePassword);

module.exports = router;
