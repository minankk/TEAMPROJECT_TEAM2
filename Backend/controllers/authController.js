const db = require('../db')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    exports.logout = (req, res) => {
    req.session.loggedIn = false;
    req.session.destroy(error => {
        if (error) {
            return res.status(500).json({ message: 'Could not log out' });
        }  
    res.status(200).json({ message: 'Logout successful' });
    });
}

//sign up as user
    exports.signup = async (req , res) => {
    const { username, email, password ,password_confirmation} = req.body;

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
        //Hashed password
        const hashedPassword = await bcrypt.hash(password , 8);

        //Inserting Into database
        await db.query(
            'INSERT INTO users (user_name, email, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
            [username, email, hashedPassword, 'user']
        );

        // Generate JWT token
        const payload = { username, email, role: 'user' };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '2h' }); // Token expires in 1 hour

        // Send the JWT token to the client
        res.status(200).json({
        message: 'User registered successfully',
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

