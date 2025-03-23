const jwt = require('jsonwebtoken');
const db = require('../db');
const crypto = require('crypto');
const dashboardController = require('../controllers/dashboardController');


exports.checkoutAndCreateOrder = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const { items, shippingAddress } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Order must have at least one item.' });
        }

        if (!shippingAddress || typeof shippingAddress !== 'string') {
            return res.status(400).json({ message: 'Shipping address is required and must be a valid string.' });
        }
        const [user] = await db.execute(`
            SELECT u.membership_status, COALESCE(SUM(o.total_amount), 0) AS total_spent
            FROM users u
            LEFT JOIN orders o ON u.user_id = o.user_id
            WHERE u.user_id = ?
            GROUP BY u.user_id
        `, [userId]);

        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const membershipStatus = user[0].membership_status;
        const totalSpent = user[0].total_spent || 0;

        const [cartItems] = await db.execute(`
            SELECT SUM(ci.quantity * p.price) AS cart_total
            FROM cart ci
            JOIN products p ON ci.product_id = p.product_id
            WHERE ci.user_id = ?
        `, [userId]);

        let cartTotal = cartItems[0].cart_total || 0;
        let discountInfo = { tier: "No VIP", discount: 0 };
        if (membershipStatus === 'vip') {
            discountInfo = dashboardController.genBenefitsDiscount(totalSpent);
        }

        const discountedTotal = cartTotal * (1 - discountInfo.discount);
        const finalTotalAmount = parseFloat(discountedTotal.toFixed(2));

        const trackingNumber = `TN-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
        const [orderResult] = await db.execute(
            'INSERT INTO orders (user_id, total_amount, shipping_address, status, tracking_number) VALUES (?, ?, ?, ?, ?)',
            [userId, finalTotalAmount, JSON.stringify(shippingAddress), 'Pending', trackingNumber]
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

        res.status(201).json({
            message: 'Order created successfully',
            membershipTier: discountInfo.tier,
            originalTotal: cartTotal,
            discountApplied: discountInfo.discount * 100,
            finalTotalAmount,
            orderId,
            tracking_number: trackingNumber
        });

    } catch (error) {
        console.error('Error processing checkout:', error);
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