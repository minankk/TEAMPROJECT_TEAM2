const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addToCart);
router.get('/:user_id',  cartController.getCartItems);
router.delete('/remove/:cart_id', cartController.removeFromCart);
router.post('/place-order',  cartController.placeOrder);
router.get("/cart-count/:user_id", cartController.cartCount);

module.exports = router;