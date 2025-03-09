const db = require('../db');
const nodemailer = require("nodemailer");
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

        res.status(200).json({
            message: `Welcome to your dashboard, ${user.user_name}!`,
            profile: {
                user_name: user.user_name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("Error in viewDashboard:", error);
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

// Contact us page logic after clicking submit will be sent to the gmail

    exports.contact_us = async (req , res) => {
     const {name , email , message} = req.body;

     if(!name || !email || !message){
        return res.status(400).json({error : 'All fields are required'})
     } 
     
     try {
        // Set up Nodemailer to send emails
        let transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS 
            }
        });

        // Email format
        let mailFormat = {
            from: process.env.EMAIL_USER,
            to: "vinylteamproject@gmail.com", 
            subject: "New Contact Form Submission",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        // Send email
        await transporter.sendMail(mailFormat);

        res.status(200).json({ success: "Message sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



