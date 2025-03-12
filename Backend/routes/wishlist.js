// wishlistRouter.js
const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController.js');
const authenticateJWT = require('../middlewares/jwtAuthMiddleware'); // Import authenticateJWT

// Add product to wishlist route
router.post('/wishlist/add/:productId', authenticateJWT, wishlistController.addToWishlist);

// Remove product from wishlist route
router.delete('/wishlist/remove/:productId', authenticateJWT, wishlistController.removeFromWishlist);

// Get user's wishlist route
router.get('/wishlist', authenticateJWT, wishlistController.getWishlist);

module.exports = router;