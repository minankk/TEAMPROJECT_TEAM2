//This line import the MySQL module into your Node.js project
const mysql = require("mysql2")

//to create database connection
const db = mysql.createPool({
    host: 'cs2410-web01pvm.aston.ac.uk' ,  //.env.DATABASE_HOST,          // Database host
    user: 'cs4team2',          // Database username (your database name )
    password: 'zCiGwGdHiEL4gOP',//process.env.DATABASE_PASS,      // Database password (your database password)
    database: 'cs4team2_db',//process.env.DATABASE, 
    port : 3306 ,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Connect to the database
// Test connection
db.getConnection((err, connection) => {
  if (err) {
      console.error('Error connecting to MySQL:', err);
  } else {
      console.log('Connected to MySQL Database successfully!');
      connection.release(); // Release the connection
  }
});

module.exports = db;