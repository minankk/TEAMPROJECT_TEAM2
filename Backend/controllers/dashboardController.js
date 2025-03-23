const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.viewDashboard = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('Decoded Token:', decoded);

        const [userDetails] = await db.execute('SELECT user_name, email FROM users WHERE user_id = ?', [decoded.user_id]);

        if (userDetails.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = userDetails[0];

        res.status(200).json({ message: `Welcome to your dashboard, ${user.user_name}!` });

    } catch (error) {
        console.error("Error in viewDashboard:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('Decoded Token:', decoded);

        const [userDetails] = await db.execute(
            'SELECT user_name, email FROM users WHERE user_id = ?', 
            [decoded.user_id]
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

        // Fetch user's current password
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
        const orderId = req.params.orderId;

        if (!orderId) {
            return res.status(400).json({ message: 'Order ID is required' });
        }

        // to get the order information
        const [orderDetails] = await db.execute(
            'SELECT o.order_id, o.status AS order_status, o.shipping_address, t.status AS tracking_status, t.estimated_delivery_date ' +
            'FROM orders o LEFT JOIN order_tracking t ON o.order_id = t.order_id ' +
            'WHERE o.user_id = ? AND o.order_id = ?',
            [decoded.user_id, orderId]
        );

        if (orderDetails.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            order_id: orderDetails[0].order_id,
            order_status: orderDetails[0].order_status,
            shipping_address: orderDetails[0].shipping_address,
            tracking_status: orderDetails[0].tracking_status,
            estimated_delivery_date: orderDetails[0].estimated_delivery_date
        });
        
    } catch (error) {
        console.error('Error fetching order tracking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get user's received messages
exports.getUserMessages = async (req, res) => {
    try {
        console.log('Decoded User:', req.user); // Debugging Log

        const userID = req.user?.user_id; // Ensure correct user ID key

        if (!userID) {
            return res.status(400).json({ error: 'User ID is missing' });
        }

        const [messages] = await db.query(
            'SELECT * FROM messages WHERE receiver_id = ? ORDER BY sent_at DESC',
            [userID]
        );

        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
  
  // Reply to a message
  exports.replyToMessage = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Authentication required.' });
    }
  
    try {
      const decoded = jwt.verify(token, 'your_secret_key');
      req.user = decoded;
  
      const { parentId, message } = req.body;
  
      const [parentMessages] = await db.query('SELECT sender_id FROM messages WHERE id = ?', [parentId]);
      if (parentMessages.length === 0) {
        return res.status(404).json({ error: 'Parent message not found.' });
      }
      const receiverId = parentMessages[0].sender_id;
  
      const result = await db.query(
        'INSERT INTO messages (sender_id, receiver_id, message, parent_id) VALUES (?, ?, ?, ?)',
        [req.user.id, receiverId, message, parentId]
      );
      res.status(201).json({ message: 'Reply sent.', messageId: result.insertId });
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
      const decoded = jwt.verify(token, 'your_secret_key');
      req.user = decoded;
  
      const { messageId } = req.params;
      await db.query('UPDATE messages SET is_read = TRUE WHERE id = ?', [messageId]);
      res.json({ message: 'Message marked as read.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to mark message as read.' });
    }
  };