const db = require('../db');
const formatDate = require('../helpers/dateFormatter');
const formatCurrency = require('../helpers/currencyFormatter')
const stringSimilarity = require('string-similarity');

exports.landingPage = async (req, res) => {
  if (req.session.loggedIn) {
      // Redirect to dashboard if already logged in
      return res.redirect('/dashboard'); 
  }

  // Otherwise, show the landing page
  res.status(200).json({ message: 'Welcome to the landing page' }); 
};

exports.dashboard = (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({ message: "Please log in" });
  }
   // Return dashboard data to the frontend
   res.status(200).json({
    message: `Welcome to your dashboard, ${req.session.username || "User"}!`,
   username: req.session.username || "User",
  });
};

