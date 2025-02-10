// routes/myCart.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Database connection configuration

// POST /api/cart/add (Add item to the cart)
router.post('/add', (req, res) => {
    const { user_id, album_id, quantity } = req.body;
    const query = `
        INSERT INTO cart (user_id, album_id, quantity) 
        VALUES (?, ?, ?)
    `;
    db.query(query, [user_id, album_id, quantity], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add item to cart' });
        }
        res.status(200).json({ message: 'Item added to cart' });
    });
});

// GET /api/cart/:user_id (Fetch items in the user's cart)
router.get('/:user_id', (req, res) => {
    const { user_id } = req.params;
    const query = `
        SELECT c.cart_id, a.album_name, a.artist_name, a.price, c.quantity, a.cover_image_url
        FROM cart c
        JOIN albums a ON c.album_id = a.album_id
        WHERE c.user_id = ?
    `;
    db.query(query, [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch cart items' });
        }
        res.status(200).json({ cartItems: results });
    });
});

// DELETE /api/cart/remove/:cart_id (Remove item from the cart)
router.delete('/remove/:cart_id', (req, res) => {
    const { cart_id } = req.params;
    const query = `DELETE FROM cart WHERE cart_id = ?`;
    db.query(query, [cart_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to remove item from cart' });
        }
        res.status(200).json({ message: 'Item removed from cart' });
    });
});

module.exports = router;