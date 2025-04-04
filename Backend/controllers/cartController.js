const db = require('../db');

exports.addToCart = async (req, res) => {
    try {
        const user_id = req.user?.user_id;
        const { product_id, quantity } = req.body;

        if (!user_id) {
            return res.status(401).json({ error: 'Unauthorized: user_id missing' });
        }

        if (quantity <= 0) {
            return res.status(400).json({ error: 'Quantity must be greater than 0' });
        }

        if (!product_id || !quantity) {
            return res.status(400).json({ error: 'Missing required fields: product_id, or quantity' });
        }

        const [inventoryRows] = await db.execute('SELECT stock_quantity FROM inventory WHERE product_id = ?', [product_id]);

        if (inventoryRows.length === 0) {
            return res.status(404).json({ error: 'Product not found in inventory' });
        }

        const availableQuantity = inventoryRows[0].stock_quantity;

        if (quantity > availableQuantity) {
            return res.status(400).json({ error: 'Insufficient stock' });
        }
        const [existingCartItem] = await db.execute(
            `SELECT * FROM cart WHERE user_id = ? AND product_id = ?`,
            [user_id, product_id]
        );

        if (existingCartItem.length > 0) {
            const updatedQuantity = existingCartItem[0].quantity + quantity;
            if (updatedQuantity > availableQuantity) {
                return res.status(400).json({ error: 'Insufficient stock for updated quantity' });
            }
            await db.execute(
                `UPDATE cart SET quantity = ? WHERE cart_id = ?`,
                [updatedQuantity, existingCartItem[0].cart_id]
            );

            return res.status(200).json({ message: 'Cart item quantity updated successfully' });
        } else {
            await db.execute(
                `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)`,
                [user_id, product_id, quantity]
            );

            return res.status(201).json({ message: 'Item added to cart successfully' });
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ error: 'Failed to add item to cart', details: error.sqlMessage });
    }
};


// GET /cart/:user_id (Fetch items in the user's cart)
exports.getCartItems = async (req, res) => {
    const urlUserId = req.params.user_id;
    const tokenUserId = req.user?.user_id;

    if (!tokenUserId) {
        return res.status(401).json({ error: 'Unauthorized: No user token provided' });
    }

    if (parseInt(urlUserId) !== tokenUserId) {
        return res.status(403).json({ error: 'Forbidden: User IDs do not match' });
    }
    

    try {
        const [cartItems] = await db.execute(
            `SELECT c.cart_id, p.name AS product_name, a.name AS artist_name, p.price, c.quantity, p.cover_image_url
            FROM cart c
            JOIN products p ON c.product_id = p.product_id
            JOIN artists a ON p.artist_id = a.artist_id
            WHERE c.user_id = ?`,
            [urlUserId]
        );

        if (cartItems.length === 0) {
            return res.status(404).json({ message: 'No items found in the cart' });
        }

        res.status(200).json({ cartItems });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Failed to fetch cart items', details: error.message });
    }
};

// DELETE /cart/remove/:cart_id (Remove item from the cart)
exports.removeFromCart = async (req, res) => {
    const { cart_id } = req.params;
    const tokenUserId = req.user?.user_id;

    if (!tokenUserId) {
        return res.status(401).json({ error: 'Unauthorized: No user token provided' });
    }

    try {
        // Verify user ownership
        const [cartItem] = await db.execute(`SELECT user_id FROM cart WHERE cart_id = ?`, [cart_id]);

        if (cartItem.length === 0) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        if (cartItem[0].user_id !== tokenUserId) {
            return res.status(403).json({ error: 'Forbidden: You do not own this cart item' });
        }

        await db.execute(`DELETE FROM cart WHERE cart_id = ?`, [cart_id]);
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: 'Failed to remove item from cart' });
    }
};

// Function to handle order placement
exports.placeOrder = async (req, res) => {
    if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: 'Unauthorized: user_id missing' });
    }
    const user_id = req.user.userId;
    try {
        // Get cart items
        const [cartItems] = await db.execute(`SELECT product_id, quantity FROM cart WHERE user_id = ?`, [user_id]);

        if (cartItems.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        // Check inventory and create order items
        for (const item of cartItems) {
            const [inventoryRows] = await db.execute(`SELECT stock_quantity FROM inventory WHERE product_id = ?`, [item.product_id]);
            if (inventoryRows[0].stock_quantity < item.quantity) {
                return res.status(400).json({ error: `Insufficient stock for product ${item.product_id}` });
            }
        }
        //create order
        const [orderResult] = await db.execute(`INSERT INTO orders (user_id, status, total_amount, shipping_address) VALUES (?, ?, ?, ?)`, [user_id, 'pending', 0, '']);
        const orderId = orderResult.insertId;

        let totalAmount = 0;

        for (const item of cartItems) {
            const [productRows] = await db.execute(`SELECT price FROM products WHERE product_id = ?`, [item.product_id]);
            const price = productRows[0].price;
            totalAmount += price * item.quantity;
            await db.execute(`INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`, [orderId, item.product_id, item.quantity, price]);
            await db.execute(`UPDATE inventory SET stock_quantity = stock_quantity - ? WHERE product_id = ?`, [item.quantity, item.product_id]);
        }
        await db.execute(`UPDATE orders SET total_amount = ? WHERE order_id = ?`, [totalAmount, orderId]);
        await db.execute(`DELETE FROM cart WHERE user_id = ?`, [user_id]);
        res.status(200).json({ message: 'Order placed successfully' });

    } catch (error) {
        console.error("Error in placeOrder:", error); 
        return res.status(500).json({ error: 'Failed to place order' });
      }
};

//Add a cart count endpoint for SQL database
exports.cartCount = async (req, res) => {
    const user_id = req.user.userId;
    try {
        const [cartItems] = await db.execute(`SELECT SUM(quantity) as count FROM cart WHERE user_id = ?`, [user_id]);
        const count = cartItems[0].count || 0;
        res.json({ count });
    } catch (error) {
        console.error("Error fetching cart count:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};