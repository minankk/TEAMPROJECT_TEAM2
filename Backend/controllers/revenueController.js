
const db = require('../db');




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