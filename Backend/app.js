/**
 * Importing required modules: 
 * express (framework), 
 * dotenv (environment variables), 
 * hbs (templating engine), 
 * body-parser (request body parsing), 
 * Cors (cross-origin resource sharing).
 */
const express = require("express");
const dotenv = require("dotenv")
const hbs = require("hbs")
const bodyParser = require("body-parser");
const cors = require('cors');
const session = require('express-session');


const pageRoutes = require('./routes/landingPage');  // Import the routes

//.env file is created to store all sensitive data and the path is given under dotenv.config
dotenv.config({
  path : "./.env",
})

// Create an Express application instance
const app = express(); 

// Middleware to parse incoming request bodies as JSON and for CORS => frontend if running on different host
app.use(bodyParser.json());
app.use(cors());

// Session middleware to manage user login state
app.use(session({
    secret: 'hardcodedSecretKey123',   //process.env.SESSION_SECRET || 'your-secret-key', // Use a secret key from environment variable or hardcoded
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // Set to true in production with HTTPS
 }));


//const port = 3000; // Port to run the server on

// Middleware: Let Express understand JSON data (like from POST requests)
app.use(express.json());

/***
 * To use Routes
 */

app.use("/", pageRoutes);   // entry point

//start the Express server on a specific port 
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})


// Connect to MySQL database
/*const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // MySQL username (default is 'root')
  password: 'Bidgoli1379', // Your MySQL password
  database: 'mydb' // The database name you created
});

// Check if connected to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL!');
  }
});

// ROUTE 2: Get all products (GET request)
app.get('/products', (req, res) => {
  // SQL query to get all products
  const sql = 'SELECT * FROM products';
  // Execute the query
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Oops! Failed to fetch products.');
    } else {
      res.status(200).json(results); // Send the products as JSON
    }
  });
});*/