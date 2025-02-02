// Load the required tools
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000; // Port to run the server on
const cors = require('cors');
app.use(cors());

// Middleware: Let Express understand JSON data (like from POST requests)
app.use(express.json());


// Connect to MySQL database
const connection = mysql.createConnection({
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
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
