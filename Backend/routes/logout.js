const express = require('express');
const router = express.Router();

// Handle logout functionality
router.get('/', (req, res) => {
   req.session.destroy((err) => {
      if (err) {
         return res.status(500).send('Could not log out');
      }
      res.redirect('/');  // Redirect to the home page after logging out
   });
});

module.exports = router;
