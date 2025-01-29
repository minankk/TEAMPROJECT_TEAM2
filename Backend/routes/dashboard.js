const express = require('express');
const router = express.Router();

// Serve the dashboard page (only accessible if logged in)

router.get('/',(req , res )=>{

    if (!req.session.loggedIn) {

        return res.redirect('/login');
        
    } else {
        res.send(`<h1>Welcome to your dashboard, ${req.session.username}!</h1><a href="/logout">Logout</a>`);

    }

});

module.exports = router;
