const db = require('../db')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Received login request');
        // Validation for the username and password
        if (!username || !password) {
            return res.status(400).json({ message: 'username and password are required' });
        }
        const [results] = await db.execute('SELECT * FROM users WHERE user_name = ?', [username]);

        // If no user found
        if (results.length === 0) {
            return res.status(400).json({ message: 'Please Sign Up' });
        }
        const user = results[0];

        // Comparing the hashed password in db to check if it matches with the user  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password do not match' });
        }
      
        //Generate JWT Token with user details
        const payload = { 
            user_id: user.user_id, 
            username: user.user_name, 
            role: user.role 
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
        return res.status(200).json({
            message: 'Login successful',
            token: token,
            user: { username: user.user_name }
        });

    } catch (error) {
        console.error('Login error:', error.stack);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

//logout

   exports.logout = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        await db.execute(
            'INSERT INTO blacklisted_tokens (token, expires_at) VALUES (?, FROM_UNIXTIME(?))',
            [token, decoded.exp]
        );
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};


//forgot password
    exports.forgotPassword = async(req , res) => {

        const { email } = req.body;
        try {
            const [user] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
            if (user.length === 0) {
                return res.status(404).json({ message: 'Email do not exist' });
            }

            const resetToken = crypto.randomBytes(32).toString('hex');
            const tokenExpiry = new Date(Date.now() + 3600000); 

            await db.execute('UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?', [resetToken, tokenExpiry, email]);

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset Request',
                html: `<p>You requested a password reset</p>
                       <p>Click <a href="${resetLink}">here</a> to reset your password</p>`
            };

            await transporter.sendMail(mailOptions);
            res.json({ message: 'Password reset link sent to your email' });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    };

// Reset Password
    exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const [user] = await db.execute(
            'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()', 
            [token]
        );

        if (user.length === 0) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await db.execute(
            'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE reset_token = ?', 
            [hashedPassword, token]
        );

        res.json({ message: 'Password has been reset successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//sign up as user
exports.signup = async (req , res) => {
    const { username, email, password, password_confirmation, adminSecretKey } = req.body;

//Check if all fields are entered
if (!username || !email || !password || !password_confirmation) {
    return res.status(400).json({ message: 'All fields are required' });
  }
//Check if password and password confirmation is same
if(password !== password_confirmation){
    return res.status(400).json({message : `Password do not match`});
}

// Validate email format
/**
 * ^ -> start of the string
 * [a-zA-Z0-9._-]+ -> before @ consist of a-z lowercase , A-Z uppercase , 0-9 numbers , symbols allowed  . - _ , + -> one or more character should appear leaving no empty space
 * @ -> domain in email address
 * [a-zA-Z0-9.-]+
 * \. -> '.' should be there
 * [a-zA-Z]{2,6} -> match the domain
 * $ -> end of the string
 */

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
if(!emailRegex.test(email)){
     return res.status(400).json({message : 'Invalid email format'});
}

// Password strength validation (min 8 characters, at least one number, one uppercase letter, and one special character)
const passwordStrengthRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
if (!passwordStrengthRegex.test(password)) {
       return res.status(400).json({
           success: false,
           message: 'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character'
       });
}
try {
    //Check if email already exists
    const [rows] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
        return res.status(400).json({ error: 'Email already registered. Please login' });
    }
     
    let role = 'user'; 
    let approvalStatus = null;

    if (adminSecretKey && adminSecretKey === process.env.ADMIN_SECRET_KEY) {
        role = 'admin'; 
        approvalStatus = 'pending';
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Insert into the database with or without approval status depending on the role
    const [result] = await db.query(
        'INSERT INTO users (user_name, email, password, role, approval_status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
        [username, email, hashedPassword, role, approvalStatus]
    );

    const userId = result.insertId;
    // Generate JWT token
    const payload = { user_id: userId, username, email, role };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });

    if (role === 'admin' && approvalStatus === 'pending') {
        console.log('Sending admin approval email...'); 
        sendAdminApprovalNotification(username, email);
    }

    return res.status(200).json({
        message: approvalStatus === 'pending' ? 'Admin registration request sent for approval' : 'User registered successfully',
        token,
        role
    });

} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}
};

function sendAdminApprovalNotification(username, email) {
    const adminEmail = process.env.EMAIL_USER;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: adminEmail,
        subject: 'New Admin Signup Request',
        html: `<p>New admin signup request from:</p><p>Username: ${username}</p><p>Email: ${email}</p>
               <p><a href="${process.env.FRONTEND_URL}/admin/approve?email=${email}">Click here to approve or reject</a></p>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending admin approval notification:', err);
        } else {
            console.log('Admin approval email sent:', info.response);
        }
    });
}

//to approve or reject admin sign up
exports.approveAdmin = async (req, res) => {
    const { email } = req.query;
    const { action } = req.body;

    if (!email || !action) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    try {
        
        const [userRows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (userRows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = userRows[0];
        if (action === 'approve') {
            await db.execute('UPDATE users SET approval_status = ? WHERE email = ?', ['approved', email]);
            return res.status(200).json({ message: 'Admin approved successfully' });
        } else if (action === 'reject') {
            await db.execute('UPDATE users SET approval_status = ? WHERE email = ?', ['rejected', email]);
            return res.status(200).json({ message: 'Admin rejected successfully' });
        } else {
            return res.status(400).json({ message: 'Invalid action' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

