const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// POST /api/cart/add - Add a product to the cart
router.post('/add', cartController.addToCart);

// GET /api/cart/:user_id - Fetch items in the user's cart
router.get('/:user_id', cartController.getCartItems);

// DELETE /api/cart/remove/:cart_id - Remove an item from the cart
router.delete('/remove/:cart_id', cartController.removeFromCart);

module.exports = router;