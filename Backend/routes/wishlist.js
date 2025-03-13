// wishlistRouter.js
const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController.js');

// Add product to wishlist route
router.post('/wishlist/add/:productId', wishlistController.addToWishlist);

// Remove product from wishlist route
router.delete('/wishlist/remove/:productId', wishlistController.removeFromWishlist);

// Get user's wishlist route
router.get('/wishlist',  wishlistController.getWishlist);

module.exports = router;