const db = require('../db');

exports.createOrder = async (req, res) => {
    try {
        const { user_id, items, totalAmount, shippingAddress } = req.body;

        const [orderResult] = await db.execute(
            'INSERT INTO orders (user_id, total_amount, shipping_address, status) VALUES (?, ?, ?, ?)',
            [user_id, totalAmount, JSON.stringify(shippingAddress), 'Pending']
        );
        const orderId = orderResult.insertId;

        for (const item of items) {
            await db.execute(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.product_id, item.quantity, item.price]
            );
        }
        //remove all the items from the cart
        await db.execute('DELETE FROM cart WHERE user_id = ?',[user_id]);

        res.status(201).json({ message: 'Order created', orderId });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.getOrderHistory = async (req, res) => {
    try {
        const userId = req.params.userId;
        const [orders] = await db.execute(`
            SELECT o.*, oi.product_id, oi.quantity, oi.price
            FROM orders o
            JOIN order_items oi ON o.order_id = oi.order_id
            WHERE o.user_id = ?
            ORDER BY o.order_date DESC
        `, [userId]);

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await db.execute('UPDATE orders SET status = ? WHERE order_id = ?', [status, orderId]);
        res.status(200).json({ message: 'Order status updated' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};