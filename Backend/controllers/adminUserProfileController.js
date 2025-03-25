const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//create user
exports.createUser = async (req, res) => {
    const { user_name, email, password, role } = req.body;

    if (!user_name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password,8 ); 

        await db.execute(
            'INSERT INTO users (user_name, email, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
            [user_name, email, hashedPassword, role]
        );
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

//read all user
exports.getUsers = async (req, res) => {
    try {
        const [users] = await db.execute('SELECT user_id, user_name, email, role FROM users');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

//to read specific users
exports.getSpecificUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const [user] = await db.execute('SELECT user_id, user_name, email, role FROM users WHERE user_id = ?', [id]);

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

//to update user
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { user_name, email, role, password } = req.body;

    let updateFields = [];
    let updateValues = [];

    if (user_name) {
        updateFields.push('user_name = ?');
        updateValues.push(user_name);
    }
    if (email) {
        updateFields.push('email = ?');
        updateValues.push(email);
    }
    if (role) {
        updateFields.push('role = ?');
        updateValues.push(role);
    }
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateFields.push('password = ?');
        updateValues.push(hashedPassword);
    }
    if (updateFields.length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    updateValues.push(id);

    try {
        const query = `UPDATE users SET ${updateFields.join(', ')} , updated_at = NOW() WHERE user_id = ?`;
        await db.execute(query, updateValues);

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// To Delete User
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await db.execute('DELETE FROM wishlist WHERE user_id = ?', [id]);

        await db.execute('DELETE FROM order_tracking WHERE order_id IN (SELECT order_id FROM orders WHERE user_id = ?)', [id]);

        await db.execute('DELETE FROM order_items WHERE order_id IN (SELECT order_id FROM orders WHERE user_id = ?)', [id]);

        await db.execute('DELETE FROM orders WHERE user_id = ?', [id]);

        const [result] = await db.execute('DELETE FROM users WHERE user_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found or already deleted' });
        }

        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};



















