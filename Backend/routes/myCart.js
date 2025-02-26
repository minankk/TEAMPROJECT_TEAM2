
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addToCart);

router.get('/:user_id', cartController.getCartItems);

router.delete('/remove/:cart_id', cartController.removeFromCart);

module.exports = router;

//eg code i made to test the cart navbar badge//

// const express = require("express");
// const router = express.Router();
// const Cart = require("../models/Cart");
// const authenticateUser = require("../middleware/authMiddleware");

// router.get("/cart-count", authenticateUser, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const cart = await Cart.findOne({ userId });

//     if (!cart || !cart.items.length) {
//       return res.json({ count: 0 });
//     }

//     const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
//     res.json({ count: itemCount });
//   } catch (error) {
//     console.error("Error fetching cart count:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;
