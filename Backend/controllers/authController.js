const db = require('../db')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Received login request');

        if (!username || !password) {
            return res.status(400).json({ message: 'Username or email and password are required' });
        }

        const [results] = await db.execute(
            'SELECT * FROM users WHERE user_name = ? OR email = ?', 
            [username, username]
        );

        if (results.length === 0) {
            return res.status(400).json({ message: 'User not found. Please Sign Up.' });
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password does not match' });
        }

        if (user.role === 'admin' && user.approval_status !== 'approved') {
            return res.status(403).json({
                message: 'Admin approval is pending. You cannot log in until approved.'
            });
        }

        await db.execute('UPDATE users SET last_login = NOW() WHERE user_id = ?', [user.user_id]);

        const payload = {
            user_id: user.user_id,
            username: user.user_name,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });

        console.log("Generated Token Payload:", payload);

        return res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                user_id: user.user_id,
                username: user.user_name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error.stack);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



//logout

exports.logout = async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log("logoutController: Received token:", token);

    if (!token) {
        console.log("logoutController: No token provided");
        return res.status(400).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("logoutController: Verified token:", decoded);

        await db.execute(
            'INSERT INTO blacklisted_tokens (token, expires_at) VALUES (?, FROM_UNIXTIME(?))',
            [token, decoded.exp]
        );
        console.log("logoutController: Token blacklisted successfully");
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error("logoutController: Error during logout:", error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        return res.status(400).json({ message: 'Logout failed' });
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
            res.json({ message: 'Password reset link sent to your email' ,
            token: resetToken
            });
    
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

// Sign up as user or admin
exports.signup = async (req, res) => {
    const { username, email, password, password_confirmation, adminSecretKey } = req.body;
     
    // Check if all fields are entered
    if (!username || !email || !password || !password_confirmation) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if password and password confirmation match
    if (password !== password_confirmation) {
        return res.status(400).json({ message: 'Password does not match' });
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
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Password strength validation
    const passwordStrengthRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordStrengthRegex.test(password)) {
        return res.status(400).json({
            message: 'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character',
            success: false 
        });
    }

        let role = 'user';
        let approvalStatus = null;

        if (adminSecretKey) {
            if (adminSecretKey !== process.env.ADMIN_SECRET_KEY) {
                return res.status(403).json({ message: "Invalid admin secret key" });
            }
            role = 'admin';
            approvalStatus = 'pending';
        } else if (req.body.role === 'admin') {
            return res.status(400).json({ message: "Admin secret key is required for admin registration" });
        }

        try {
            
            const [rows] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
            if (rows.length > 0) {
                return res.status(400).json({ message: 'Email already registered. Please login' });
            }
    
            const [usernameRows] = await db.query('SELECT user_name FROM users WHERE user_name = ?', [username]);
            if (usernameRows.length > 0) {
                return res.status(400).json({ message: 'Username already taken. Please choose a different one' });
            }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            'INSERT INTO users (user_name, email, password, role, approval_status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
            [username, email, hashedPassword, role, approvalStatus]
        );

        const userId = result.insertId;
        
        const payload = { user_id: userId, username, email, role };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });

        if (role === 'admin' && approvalStatus === 'pending') {
            sendAdminApprovalNotification(username, email);
            return res.status(200).json({
                message: 'Admin registration request sent for approval',
                status: 'pending',
                role,
                token
            });
        }
            return res.status(200).json({
            message: 'User registered successfully',
            role,
            token
        });
        
    } catch (error) {
        console.error('Signup Error:', error);
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

