// Load the required tools
const express = require('express'); // Express framework
const mysql = require('mysql2'); // MySQL connector
const app = express(); // Create an Express app
const port = 3000; // Port to run the server on

// Middleware: Let Express understand JSON data (like from POST requests)
app.use(express.json());

// Connect to MySQL database
  const connection = mysql.createConnection({
  host: 'localhost', // Where your MySQL is running (your computer)
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

// --------------------------------------------
// ROUTE 1: Add a product (POST request)
// --------------------------------------------
        /*app.post('/products', (req, res) => {
          // Get data from the request body (like a form submission)
          const { name, artist_id, album_id, genre_id, release_date, price, cover_image_url } = req.body;

          // SQL query to insert data into the 'products' table
          const sql = `
            INSERT INTO products 
            (name, artist_id, album_id, genre_id, release_date, price, cover_image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
          
          // Execute the query with the data
          connection.query(
            sql,
            [name, artist_id, album_id, genre_id, release_date, price, cover_image_url],
            (err, result) => {
              if (err) {
                console.error('Error adding product:', err);
                res.status(500).send('Oops! Failed to add product.');
              } else {
                res.status(201).send('Product added! 🎉');
              }
            }
          );
        });
        ROUTE 1 IS JSUT FOR ADDING A PRODUCT TO THE DATABASE SO I COMMENTED IT OUT 
        */
// --------------------------------------------
// ROUTE 2: Get all products (GET request)
// --------------------------------------------
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