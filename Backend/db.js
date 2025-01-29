//This line import the MySQL module into your Node.js project
const mysql = require("mysql2")

//to create database connection
const database = mysql.createConnection({
    host: process.env.DATABASE_HOST,          // Database host
    user: process.env.DATABASE_USER,          // Database username (your database name )
    password: process.env.DATABASE_PASS,      // Database password (your database password)
    database: process.env.DATABASE,          // Database name (your credentials)
});

// Connect to the database
database.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return;
    }
    console.log("Connected to the database successfully!");
  });

  module.exports = db;