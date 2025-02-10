const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// POST /cart/add - Add a product to the cart
router.post('/add', cartController.addToCart);

// GET /cart/:user_id - Fetch items in the user's cart
router.get('/:user_id', cartController.getCartItems);

// DELETE /cart/remove/:cart_id - Remove an item from the cart
router.delete('/remove/:cart_id', cartController.removeFromCart);

module.exports = router;