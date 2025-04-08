// wishlistRouter.js
const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController.js');

// Add product to wishlist route
router.post('/add/:productId', wishlistController.addToWishlist);

// Remove product from wishlist route
router.delete('/remove/:productId', wishlistController.removeFromWishlist);

// Get user's wishlist route
router.get('/:user_id', wishlistController.getWishlist);


module.exports = router;