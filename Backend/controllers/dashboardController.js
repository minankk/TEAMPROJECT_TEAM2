const db = require('../db');
const jwt = require('jsonwebtoken');

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






//change password in dashboard
exports.changePassword = (req , res) => {
    const { oldPassword, newPassword } = req.body;
    const userID = req.session.user_id;

    if(!userID){
        return res.status(400).json({message: 'Unauthorized. Please log in.'});
    }

    if(!oldPassword || !newPassword){
        return res.status(400).json({message :'Old password and new password are required' });
    }

    if (newPassword.length < 8) {
        return res.status(400).json({ message: 'New password must be at least 8 characters long' });
    }

    const query = 'SELECT password FROM users where user_id = ? ';

    db.query(query ,[userID], (err , results) => {
        
        if(err){
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Error verifying old password' });
        }

        if(results===0){
            return res.status(404).json({ message: 'User not found' });
        }

        const storedPassword = results[0].password;

        if (storedPassword !== oldPassword) {
            return res.status(400).json({ message: 'Incorrect old password' });
        }
       // Update the password if the old password matches
       const updatePasswordQuery = 'UPDATE users SET password = ? WHERE user_id = ?';

       db.query(updatePasswordQuery, [newPassword, userID], (err, results) => {
       if (err) {
         console.error('Database query error:', err);
         return res.status(500).json({ message: 'Error updating password' });
        }

        return res.status(200).json({ message: 'Password updated successfully' });
        });
    })
}
