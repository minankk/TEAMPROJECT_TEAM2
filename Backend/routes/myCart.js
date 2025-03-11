const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const verifyToken = require('../controllers/cartController').verifyToken; // Import verifyToken

router.post('/add', cartController.addToCart); // Now uses verifyToken internally
router.get('/:user_id', cartController.getCartItems); // Now uses verifyToken internally
router.delete('/remove/:cart_id', cartController.removeFromCart); // Does not need verifyToken
router.post('/place-order', cartController.placeOrder); // Now uses verifyToken internally
router.get("/cart-count/:user_id", cartController.cartCount); // Now uses verifyToken internally

module.exports = router;