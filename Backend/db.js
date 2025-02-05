//This line import the MySQL module into your Node.js project
const mysql = require("mysql2")

const db = mysql.createConnection({
  host: '127.0.0.1',               // Database host
  user: 'root',                    // Database username
  password: 'teamProject@01',      // Database password
  database: 'vinyldatabase',       // Database name
  port: 3306,                      // Database port (default MySQL port)
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});


module.exports = db

