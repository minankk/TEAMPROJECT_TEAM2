// wishlistController.js
const db = require('../db');

// Function to add a product to the wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const userId = req.user.userId; // Get user ID from req.user
        const productId = req.params.productId;

        const [existingWishlistItem] = await db.execute(
            'SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?',
            [userId, productId]
        );

        if (existingWishlistItem.length > 0) {
            return res.status(400).json({ message: 'Product is already in the wishlist' });
        }

        await db.execute(
            'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)',
            [userId, productId]
        );
        res.status(200).json({ message: 'Product added to wishlist' });
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Function to remove a product from the wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.userId; // Get user ID from req.user
        const productId = req.params.productId;

        await db.execute(
            'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?',
            [userId, productId]
        );
        res.status(200).json({ message: 'Product removed from wishlist' });
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Function to get the user's wishlist
exports.getWishlist = async (req, res) => {
    try {
        const userId = req.user.userId; // Get user ID from req.user

        const [wishlistItems] = await db.execute(
            `SELECT p.* FROM wishlist w JOIN products p ON w.product_id = p.product_id WHERE w.user_id = ?`,
            [userId]
        );
        res.status(200).json(wishlistItems);
    } catch (error) {
        console.error('Error getting wishlist:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};