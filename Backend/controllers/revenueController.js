// revenueController.js
// Importing the database connection from db.js
const db = require('../db');

/*

// Function to get total revenue
exports.getTotalRevenue = (req, res) => {
  // SQL query to calculate the total revenue of all orders
  const query = 'SELECT SUM(order_total) AS totalRevenue FROM orders';
  
  // Execute the query on the database
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);  // Log the error if any
      return res.status(500).send('Server Error');  // Return server error response
    }
    
    // If no result, set totalRevenue to 0
    const totalRevenue = results[0].totalRevenue || 0;
    res.json({ totalRevenue });  // Return total revenue as JSON response
  });
};

// Function to get total revenue with discounts applied
exports.getDiscountsApplied = (req, res) => {
  // SQL query to calculate the total revenue of orders with discount codes applied
  const query = 'SELECT SUM(order_total) AS totalRevenueWithDiscount FROM orders WHERE discount_code IS NOT NULL';
  
  // Execute the query on the database
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);  // Log the error if any
      return res.status(500).send('Server Error');  // Return server error response
    }
    
    // If no result, set totalRevenueWithDiscount to 0
    const totalRevenueWithDiscount = results[0].totalRevenueWithDiscount || 0;
    res.json({ totalRevenueWithDiscount });  // Return revenue with discounts as JSON response
  });
};



// Function to get total revenue
exports.getTotalRevenue = (req, res) => {
  // Modified SQL query: using total_amount
  const query = 'SELECT SUM(total_amount) AS totalRevenue FROM orders';

  // Execute the query on the database
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);  // Log the error if any
      return res.status(500).send('Server Error');  // Return server error response
    }

    // If no result, set totalRevenue to 0
    const totalRevenue = results[0]?.totalRevenue || 0;
    res.json({ totalRevenue });  // Return total revenue as JSON response
  });
};

// Function to get total revenue with discounts applied
exports.getDiscountsApplied = (req, res) => {
  // Modified SQL query: using total_amount
  const query = 'SELECT SUM(total_amount) AS totalRevenueWithDiscount FROM orders WHERE discount_code IS NOT NULL';

  // Execute the query on the database
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);  // Log the error if any
      return res.status(500).send('Server Error');  // Return server error response
    }

    // If no result, set totalRevenueWithDiscount to 0
    const totalRevenueWithDiscount = results[0]?.totalRevenueWithDiscount || 0;
    res.json({ totalRevenueWithDiscount });  // Return revenue with discounts as JSON response
  });
};

*/



// Function to get total revenue
exports.getTotalRevenue = async (req, res) => {
  try {
    const [results] = await db.query('SELECT SUM(total_amount) AS totalRevenue FROM orders');
    const totalRevenue = results[0]?.totalRevenue || 0;
    res.json({ totalRevenue });
  } catch (err) {
    console.error('Error fetching total revenue:', err);
    res.status(500).send('Server Error');
  }
};

// Function to get total revenue with discounts applied
exports.getDiscountsApplied = async (req, res) => {
  try {
    const [results] = await db.query(
      'SELECT SUM(total_amount) AS totalRevenueWithDiscount FROM orders WHERE discount_code IS NOT NULL'
    );
    const totalRevenueWithDiscount = results[0]?.totalRevenueWithDiscount || 0;
    res.json({ totalRevenueWithDiscount });
  } catch (err) {
    console.error('Error fetching revenue with discount:', err);
    res.status(500).send('Server Error');
  }
};