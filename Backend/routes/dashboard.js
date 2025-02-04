const express = require('express');
const router = express.Router();
const { dashboard } = require('../controllers/pageController');
const userController  = require('../controllers/userController');


router.get('/', dashboard);

router.get('/profile', userController.viewProfile);
router.post('/change-password', userController.changePassword);

module.exports = router;
