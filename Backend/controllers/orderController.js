const jwt = require('jsonwebtoken');
const db = require('../db');
const crypto = require('crypto');
const dashboardController = require('./dashboardController');

/*

exports.checkoutAndCreateOrder = async (req, res) => {
    const connection = await db.getConnection(); 
    await connection.beginTransaction();

    try {
        const userId = req.user.user_id;

        const { items, totalAmount, shippingAddress } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            await connection.rollback();
            return res.status(400).json({ message: 'Order must have at least one item.' });
        }

        if (!totalAmount || typeof totalAmount !== 'number' || totalAmount <= 0) {
            return res.status(400).json({ message: 'Total amount is required and must be a positive number.' });
        }

        if (!shippingAddress || typeof shippingAddress !== 'string') {
            await connection.rollback(); 
            return res.status(400).json({ message: 'Shipping address is required and must be a valid string.' });
        }

        const [user] = await connection.execute(`
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

        const [cartItems] = await connection.execute(`
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
        const [orderResult] = await connection.execute(
            'INSERT INTO orders (user_id, total_amount, shipping_address, status, tracking_number) VALUES (?, ?, ?, ?, ?)',
            [userId, totalAmount, JSON.stringify(shippingAddress), 'Pending', trackingNumber]
        );

        const orderId = orderResult.insertId;
        for (const item of items) {
            if (!item.product_id || !item.quantity || !item.price) {
                await connection.rollback(); 
                return res.status(400).json({ message: 'Each item must have product_id, quantity, and price.' });
            }

            const [productCheck] = await connection.execute('SELECT stock_quantity FROM inventory WHERE product_id = ? FOR UPDATE', [item.product_id]);
            if (productCheck.length === 0 || productCheck[0].stock_quantity < item.quantity) {
                await connection.rollback(); 
                return res.status(400).json({ message: `Insufficient stock for product ID: ${item.product_id}` });
            }

            await connection.execute(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.product_id, item.quantity, item.price]
            );

            await connection.execute(
                'UPDATE inventory SET stock_quantity = stock_quantity - ? WHERE product_id = ?',
                [item.quantity, item.product_id]
            );
        }

        await connection.execute(
            'INSERT INTO order_tracking (order_id, status, estimated_delivery_date) VALUES (?, ?, ?)',
            [orderId, 'Processing', new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)]
        );
        
        await connection.execute('DELETE FROM cart WHERE user_id = ?', [userId]);

        await connection.commit();

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
        console.error('Error creating order:', error);
        await connection.rollback(); 
        res.status(500).json({ message: 'Internal server error', error: error.message });
    } finally {
        connection.release(); 
    }
};


exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const [result] = await db.execute('UPDATE orders SET status = ? WHERE order_id = ?', [status, orderId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order status updated' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

*/

exports.checkoutAndCreateOrder = async (req, res) => {
    const connection = await db.getConnection(); 
    await connection.beginTransaction();

    try {
        const userId = req.user.user_id;

        const { items, totalAmount, shippingAddress } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            await connection.rollback();
            return res.status(400).json({ message: 'Order must have at least one item.' });
        }

        if (!totalAmount || typeof totalAmount !== 'number' || totalAmount <= 0) {
            return res.status(400).json({ message: 'Total amount is required and must be a positive number.' });
        }

        if (!shippingAddress || typeof shippingAddress !== 'string') {
            await connection.rollback(); 
            return res.status(400).json({ message: 'Shipping address is required and must be a valid string.' });
        }

        const [user] = await connection.execute(`
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

        const [cartItems] = await connection.execute(`
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
        const [orderResult] = await connection.execute(
            'INSERT INTO orders (user_id, total_amount, shipping_address, status, tracking_number) VALUES (?, ?, ?, ?, ?)',
            [userId, totalAmount, JSON.stringify(shippingAddress), 'Pending', trackingNumber]
        );

        const orderId = orderResult.insertId;
        for (const item of items) {
            if (!item.product_id || !item.quantity || !item.price) {
                await connection.rollback(); 
                return res.status(400).json({ message: 'Each item must have product_id, quantity, and price.' });
            }

            const [productCheck] = await connection.execute('SELECT stock_quantity FROM inventory WHERE product_id = ? FOR UPDATE', [item.product_id]);
            if (productCheck.length === 0 || productCheck[0].stock_quantity < item.quantity) {
                await connection.rollback(); 
                return res.status(400).json({ message: `Insufficient stock for product ID: ${item.product_id}` });
            }

            await connection.execute(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.product_id, item.quantity, item.price]
            );

            await connection.execute(
                'UPDATE inventory SET stock_quantity = stock_quantity - ? WHERE product_id = ?',
                [item.quantity, item.product_id]
            );
        }

        await connection.execute(
            'INSERT INTO order_tracking (order_id, status, estimated_delivery_date) VALUES (?, ?, ?)',
            [orderId, 'Processing', new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)]
        );
        
        await connection.execute('DELETE FROM cart WHERE user_id = ?', [userId]);

        await connection.commit();

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
        console.error('Error creating order:', error);
        await connection.rollback(); 
        res.status(500).json({ message: 'Internal server error', error: error.message });
    } finally {
        connection.release(); 
    }
};


exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const [result] = await db.execute('UPDATE orders SET status = ? WHERE order_id = ?', [status, orderId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order status updated' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};