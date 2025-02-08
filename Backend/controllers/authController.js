const users = require('../data/mockData');
const db = require('../db')
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Validation checks
        if (!userName || !password) {
            return res.status(400).json({ message: 'userName and password are required' });
        }

        // Query the database 
        const [results] = await db.execute('SELECT * FROM users WHERE user_name = ?', [userName]);

        // If no user found
        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = results[0];

        // Compare hashed password asynchronously
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Set session variables
        req.session.loggedIn = true;
        req.session.userName = user.user_name;
        req.session.user_id = user.user_id;
        req.session.role = user.role;

        return res.status(200).json({ 
            message: 'Login successful', 
            user: { userName: user.user_name }
        });

    } catch (error) {
        console.error('Login error:', error.stack);
        return res.status(500).json({ message: 'Internal server error' , error: error.message});
    }
};


/*exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.loggedIn = true;
        req.session.username = username;
    // Return success response
    return res.status(200).json({ 
        message: 'Login successful', 
        user: { username: user.username },
      });
    } else {
      console.log("Invalid login attempt"); 
    // Return error response
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  };*/

//logout
    exports.logout = (req, res) => {
    // Destroy the session
    req.session.loggedIn = false;
    req.session.destroy(error => {
        if (error) {
            return res.status(500).json({ message: 'Could not log out' });
        }  
    // Return success response
    res.status(200).json({ message: 'Logout successful' });
    });
}

//sign up as user
    exports.signup = async (req , res) => {
    const { userName, email, password ,password_confirmation} = req.body;

    //Check if all fields are entered
    if (!userName || !email || !password || !password_confirmation) {
        return res.status(400).json({ message: 'All fields are required' });
      }
    //Check if password and password confirmation is same
    if(password !== password_confirmation){
        return res.status(400).json({message : `Password doesnot match`});
    }

    try {
        //Check if email already exists
        const [rows] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }
        //Hashed password
        const hashedPassword = await bcrypt.hash(password , 8);

        //Insert Into database
        await db.query(
            'INSERT INTO users (user_name, email, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
            [userName, email, hashedPassword, 'user']
        );

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

};


