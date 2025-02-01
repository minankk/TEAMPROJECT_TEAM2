//This line import the MySQL module into your Node.js project
//const mysql = require("mysql2")

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'cs2410-web01pvm.aston.ac.uk',
  user     : 'cs4team2',
  password : 'zCiGwGdHiEL4gOP',
  database : 'cs4team2_db',
  connectTimeout:   10000
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });
/*
//to create database connection
const db = mysql.createConnection({
    host: 'cs2410-web01pvm.aston.ac.uk' ,  //.env.DATABASE_HOST,          // Database host
    user: 'cs4team2',          // Database username (your database name )
    password: 'zCiGwGdHiEL4gOP',//process.env.DATABASE_PASS,      // Database password (your database password)
    database: 'cs4team2_db',//process.env.DATABASE, 
    port : 3306 ,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

});++

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

module.exports = db;*/