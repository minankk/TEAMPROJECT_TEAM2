const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addToCart);
router.get('/:user_id', cartController.getCartItems);
router.delete('/remove/:cart_id', cartController.removeFromCart);

// Add a cart count endpoint for SQL database
router.get("/cart-count/:user_id", async (req, res) => {
    const { user_id } = req.params;
    try {
        const [cartItems] = await db.execute(`SELECT SUM(quantity) as count FROM cart WHERE user_id = ?`, [user_id]);
        const count = cartItems[0].count || 0;
        res.json({ count });
    } catch (error) {
        console.error("Error fetching cart count:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;