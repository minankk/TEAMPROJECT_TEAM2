//This line import the MySQL module into your Node.js project
const mysql = require("mysql2/promise")

const db = mysql.createPool({
  host:     '127.0.0.1'  ,          //'cs2410-web01pvm.aston.ac.uk' ,   
  user:   'root',               //'cs4team2' ,                                 
  password:  'mjjmylife123!',            //'zCiGwGdHiEL4gOP' ,                                   
  database:   'team_project' ,      //'cs4team2_db',                               
  port: 3306,                      // Database port (default MySQL port)
});

(async () => {
  try {
    const connection = await db.getConnection();
    console.log("Connected to the database.");
    connection.release();
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
})();

module.exports = db;
