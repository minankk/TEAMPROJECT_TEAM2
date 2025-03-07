const db = require('../db');

// POST /cart/add (Add item to the cart)
exports.addToCart = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    if (!user_id || !product_id || !quantity) {
        return res
            .status(400)
            .json({ error: 'Missing required fields: user_id, product_id, or quantity' });
    }

    if (quantity <= 0) {
        return res.status(400).json({ error: 'Quantity must be greater than 0' });
    }

    try {
        // Check product quantity
        const [productRows] = await db.execute('SELECT quantity FROM products WHERE product_id = ?', [product_id]);

        if (productRows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const availableQuantity = productRows[0].quantity;

        if (quantity > availableQuantity) {
            return res.status(400).json({ error: 'Insufficient stock' });
        }

        // Check if the product already exists in the user's cart
        const [existingCartItem] = await db.execute(
            `SELECT * FROM cart WHERE user_id = ? AND product_id = ?`,
            [user_id, product_id]
        );

        if (existingCartItem.length > 0) {
            // If the item exists, update the quantity
            const updatedQuantity = existingCartItem[0].quantity + quantity;
            if (updatedQuantity > availableQuantity){
              return res.status(400).json({error: 'Insufficient stock'});
            }

            await db.execute(
                `UPDATE cart SET quantity = ? WHERE cart_id = ?`,
                [updatedQuantity, existingCartItem[0].cart_id]
            );
            return res.status(200).json({ message: 'Cart item quantity updated' });
        } else {
            // If the item doesn't exist, insert a new record
            await db.execute(
                `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)`,
                [user_id, product_id, quantity]
            );
            return res.status(201).json({ message: 'Item added to cart' });
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ error: 'Failed to add item to cart' });
    }
};

// GET /cart/:user_id (Fetch items in the user's cart)
exports.getCartItems = async (req, res) => {
    const { user_id } = req.params;

    try {
        const [cartItems] = await db.execute(
            `
            SELECT 
                c.cart_id, 
                p.name AS product_name, 
                a.name AS artist_name, 
                p.price, 
                c.quantity, 
                p.cover_image_url
            FROM cart c
            JOIN products p ON c.product_id = p.product_id
            JOIN artists a ON p.artist_id = a.artist_id
            WHERE c.user_id = ?
            `,
            [user_id]
        );

        res.status(200).json({ cartItems });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Failed to fetch cart items' });
    }
};

// DELETE /cart/remove/:cart_id (Remove item from the cart)
exports.removeFromCart = async (req, res) => {
    const { cart_id } = req.params;

    try {
        await db.execute(`DELETE FROM cart WHERE cart_id = ?`, [cart_id]);
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: 'Failed to remove item from cart' });
    }
};

// Function to handle order placement
exports.placeOrder = async (req, res) => {
  try {
    const { user_id } = req.body;

    // Fetch the user's cart items
    const [cartItems] = await db.execute(
      `SELECT product_id, quantity FROM cart WHERE user_id = ?`,
      [user_id]
    );

    // Check if the cart is empty
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Check if there is enough stock for all items
    for (const item of cartItems) {
      const [productRows] = await db.execute(
        'SELECT quantity FROM products WHERE product_id = ?',
        [item.product_id]
      );

      if (productRows[0].quantity < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for product ${item.product_id}`,
        });
      }
    }

    // Deduct quantity from products
    for (const item of cartItems) {
      await db.execute(
        'UPDATE products SET quantity = quantity - ? WHERE product_id = ?',
        [item.quantity, item.product_id]
      );
    }

    // Clear the cart
    await db.execute('DELETE FROM cart WHERE user_id = ?', [user_id]);

    res.status(200).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
};