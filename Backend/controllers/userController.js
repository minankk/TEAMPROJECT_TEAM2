
const db = require('../db');

// Get User Profile 
exports.viewProfile = (req, res) => {
    const userId = req.session.user_id; // Get user_id from the session

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }
    // Query the database to fetch user details
    const query = 'SELECT user_name, email, phone_number, created_at FROM users WHERE user_id = ?';
    
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Error fetching profile data' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = results[0];
        return res.status(200).json({ profile: user });
    });
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
