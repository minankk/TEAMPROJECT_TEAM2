const express = require('express');
const router = express.Router();
//const { dashboard } = require('../controllers/pageController');

const { viewDashboard} = require('../controllers/userController');


router.get('/', viewDashboard);

//router.post('/change-password', changePassword);

module.exports = router;
