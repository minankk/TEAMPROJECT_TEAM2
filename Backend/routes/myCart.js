
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addToCart);

router.get('/:user_id', cartController.getCartItems);

router.delete('/remove/:cart_id', cartController.removeFromCart);

module.exports = router;
