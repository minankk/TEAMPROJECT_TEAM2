const jwt = require('jsonwebtoken');
const db = require('../db');
const crypto = require('crypto');

exports.createOrder = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.user_id;
        const { items, totalAmount, shippingAddress } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Order must have at least one item.' });
        }

        if (!totalAmount || typeof totalAmount !== 'number' || totalAmount <= 0) {
            return res.status(400).json({ message: 'Total amount is required and must be a positive number.' });
        }

        if (!shippingAddress || typeof shippingAddress !== 'string') {
            return res.status(400).json({ message: 'Shipping address is required and must be a valid string.' });
        }
        const trackingNumber = `TN-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

        const [orderResult] = await db.execute(
            'INSERT INTO orders (user_id, total_amount, shipping_address, status, tracking_number) VALUES (?, ?, ?, ?, ?)',
            [userId, totalAmount, JSON.stringify(shippingAddress), 'Pending', trackingNumber]
        );

        const orderId = orderResult.insertId;

        for (const item of items) {
            if (!item.product_id || !item.quantity || !item.price) {
                return res.status(400).json({ message: 'Each item must have product_id, quantity, and price.' });
            }

            await db.execute(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.product_id, item.quantity, item.price]
            );
        }
        await db.execute(
            'INSERT INTO order_tracking (order_id, status, estimated_delivery_date) VALUES (?, ?, ?)',
            [orderId, 'Processing', new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)]
        );

        await db.execute('DELETE FROM cart WHERE user_id = ?', [userId]);

        res.status(201).json({ message: 'Order created successfully', orderId, tracking_number: trackingNumber });

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