const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const genBenefitsDiscount = (totalSpent) => {
    if (totalSpent >= 200) {
        return { tier: "Gold", discount: 0.25 };
    } else if (totalSpent >= 100) {
        return { tier: "Silver", discount: 0.20 };
    } else if (totalSpent >= 50) {
        return { tier: "Bronze", discount: 0.15 };
    }
    return { tier: "No VIP", discount: 0.10 };
};

exports.viewDashboard = async (req, res) => {
    try {
        const userId = req.user.user_id;

        const [userDetails] = await db.execute(
            'SELECT user_name, email, membership_status FROM users WHERE user_id = ?',
            [userId]
        );

        if (userDetails.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = userDetails[0];
        const isVIP = user.membership_status === 'vip';

        const [spendingData] = await db.execute(`
            SELECT COALESCE(SUM(total_amount), 0) AS totalSpent
            FROM orders
            WHERE user_id = ?
        `, [userId]);

        const totalSpent = spendingData[0].totalSpent;

        const [orderCountData] = await db.execute(`
            SELECT COUNT(*) AS orderCount
            FROM orders
            WHERE user_id = ?
        `, [userId]);

        const orderCount = orderCountData[0].orderCount;

        const [wishlistData] = await db.execute(`
            SELECT COUNT(*) AS wishlistCount
            FROM wishlist
            WHERE user_id = ?
        `, [userId]);
        
        const wishlistCount = wishlistData[0].wishlistCount;
        

        const benefits = isVIP ? genBenefitsDiscount(totalSpent) : null;

        res.status(200).json({
            username: user.user_name,
            message: `Welcome to your dashboard!`,
            isVIP: isVIP,
            totalSpent: totalSpent,
            orderCount: orderCount,
            wishlistCount: wishlistCount,
            benefits: benefits
        });

    } catch (error) {
        console.error("Error in viewDashboard:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.user_id;

        const [userDetails] = await db.execute(
            'SELECT user_name, email FROM users WHERE user_id = ?',
            [userId]
        );
        if (userDetails.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = userDetails[0];

        res.status(200).json({ user_name: user.user_name, email: user.email });

    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { user_name, email } = req.body;

        if (!user_name && !email) {
            return res.status(400).json({ message: 'At least one of Username or Email is required' });
        }

        let updateQuery = 'UPDATE users SET ';
        const updateValues = [];

        if (user_name) {
            updateQuery += 'user_name = ?, ';
            updateValues.push(user_name);
        }

        if (email) {
            updateQuery += 'email = ?, ';
            updateValues.push(email);
        }
        updateQuery = updateQuery.slice(0, -2);
        updateQuery += ' WHERE user_id = ?';
        updateValues.push(decoded.user_id);
        await db.execute(updateQuery, updateValues);

        res.status(200).json({ message: 'Profile updated successfully' });

    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.changePassword = async (req, res) => {
    try {
        const userID = req.user.user_id;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Old password and new password are required' });
        }

        // Password strength validation
        const passwordStrengthRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        if (!passwordStrengthRegex.test(newPassword)) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character',
            });
        }

        const [rows] = await db.execute('SELECT password FROM users WHERE user_id = ?', [userID]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const storedPassword = rows[0].password;

        // Compare old password with hashed password
        const isMatch = await bcrypt.compare(oldPassword, storedPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect old password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.execute('UPDATE users SET password = ? WHERE user_id = ?', [hashedPassword, userID]);

        return res.status(200).json({ message: 'Password updated successfully' });

    } catch (error) {
        console.error('Error changing password:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


exports.viewOrderTracking = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const trackingNumber = req.params.trackingNumber;

        if (!trackingNumber) {
            return res.status(400).json({ message: 'Tracking number is required' });
        }

        const [orderDetails] = await db.execute(
            `SELECT order_id, tracking_number, status AS order_status, shipping_address
             FROM orders 
             WHERE tracking_number = ? AND user_id = ?`,
            [trackingNumber, decoded.user_id]
        );
        
        if (orderDetails.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const order = orderDetails[0];

        if (order.shipping_address?.startsWith('"') && order.shipping_address.endsWith('"')) {
            order.shipping_address = order.shipping_address.slice(1, -1);
        }

        res.status(200).json(order);

    } catch (error) {
        console.error('Error fetching order tracking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

  // Get user's received messages
  exports.getUserMessages = async (req, res) => {
    try {
        const userID = req.user?.user_id;

        if (!userID) {
            return res.status(400).json({ error: 'User ID is missing' });
        }

        const [messages] = await db.query(
            `SELECT 
                m.message_id,
                m.sender_id,
                u.user_name AS sender_name,
                m.receiver_id,
                m.message,
                m.sent_at,
                m.is_read,
                m.parent_id
             FROM messages m
             JOIN users u ON m.sender_id = u.user_id
             WHERE m.receiver_id = ?
             ORDER BY m.sent_at DESC`,
            [userID]
        );

        return res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};


// Reply to a message
exports.replyToMessage = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Authentication required.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        if (!req.user.user_id) {
            return res.status(401).json({ error: 'Invalid user ID in token.' });
        }

        const { parentId, message } = req.body;
        if (!parentId || !message) {
            return res.status(400).json({ error: 'parentId and message are required.' });
        }
        const [parentMessages] = await db.query('SELECT sender_id FROM messages WHERE message_id = ?', [parentId]);
        
        if (parentMessages.length === 0) {
            return res.status(404).json({ error: `Parent message with ID ${parentId} not found.` });
        }

        const receiverId = parentMessages[0].sender_id;
        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            const result = await connection.query(
                'INSERT INTO messages (sender_id, receiver_id, message, parent_id, sent_at) VALUES (?, ?, ?, ?, NOW())',
                [req.user.user_id, receiverId, message, parentId] 
            );
            await connection.commit();
            res.status(201).json({ message: 'Reply sent.', messageId: result.insertId });
        } catch (dbError) {
            await connection.rollback();
            console.error('Database error during reply:', dbError);
            return res.status(500).json({ error: 'Failed to send reply due to database error.' });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to send reply.' });
    }
};



// Mark a message as read
exports.markMessageAsRead = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Authentication required.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;

        if (!req.user || !req.user.user_id) {
            return res.status(401).json({ error: 'Invalid user ID in token.' });
        }

        const { messageId } = req.params;
        const userId = parseInt(req.user.user_id, 10);

        const connection = await db.getConnection();
        await connection.beginTransaction(); 

        try {
            const [messageRows] = await connection.query(
                'SELECT receiver_id FROM messages WHERE message_id = ?',
                [messageId]
            );

            if (messageRows.length === 0) {
                await connection.rollback();
                connection.release();
                return res.status(404).json({ error: `Message with ID ${messageId} not found.` });
            }

            if (parseInt(messageRows[0].receiver_id, 10) !== userId) {
                await connection.rollback();
                connection.release();
                return res.status(403).json({ error: 'You are not authorized to mark this message as read.' });
            }

            await connection.query(
                'UPDATE messages SET is_read = TRUE WHERE message_id = ?',
                [messageId]
            );

            await connection.commit();
            connection.release();

            res.json({ message: 'Message marked as read.' });

        } catch (dbError) {
            await connection.rollback();
            connection.release();
            console.error('Database error marking message as read:', dbError);
            return res.status(500).json({ error: 'Failed to mark message as read due to database error.' });
        }
    } catch (error) {
        console.error('Error marking message as read:', error);
        return res.status(500).json({ error: 'Failed to mark message as read.' });
    }
  };

  
  //get order history 
  exports.getOrderHistory = async (req, res) => {
    try {
        const userId = req.user.user_id;

        const [orders] = await db.execute(`
            SELECT 
                o.order_id, o.order_date, o.status, o.total_amount, o.shipping_address, 
                oi.product_id, oi.quantity, oi.price,
                p.cover_image_url
            FROM orders o
            JOIN order_items oi ON o.order_id = oi.order_id
            JOIN products p ON oi.product_id = p.product_id
            WHERE o.user_id = ?
            ORDER BY o.order_date DESC
        `, [userId]);

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        const groupedOrders = orders.reduce((acc, order) => {
            const { order_id, order_date, status, shipping_address, product_id, quantity, cover_image_url } = order;
            const total_amount = Number(order.total_amount);
            const price = Number(order.price);

            if (!acc[order_id]) {
                acc[order_id] = {
                    order_id,
                    order_date,
                    status,
                    total_amount,
                    shipping_address,
                    items: []
                };
            }

            acc[order_id].items.push({
                product_id,
                quantity,
                price,
                cover_image_url
            });

            return acc;
        }, {});

        const orderHistory = Object.values(groupedOrders);

        res.status(200).json(orderHistory);
    } catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.genBenefitsDiscount = genBenefitsDiscount;