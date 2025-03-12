const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticateJWT = require('../middlewares/jwtAuthMiddleware');

router.post('/add', authenticateJWT, cartController.addToCart);
router.get('/:user_id', authenticateJWT, cartController.getCartItems);
router.delete('/remove/:cart_id', cartController.removeFromCart);
router.post('/place-order', authenticateJWT, cartController.placeOrder);
router.get("/cart-count/:user_id", authenticateJWT, cartController.cartCount);

module.exports = router;