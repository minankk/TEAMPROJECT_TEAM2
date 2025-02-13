// routes/myCart.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// POST /cart/add
router.post('/add', cartController.addToCart);

// GET /cart/:user_id
router.get('/:user_id', cartController.getCartItems);

// DELETE /cart/remove/:cart_id
router.delete('/remove/:cart_id', cartController.removeFromCart);

module.exports = router;
