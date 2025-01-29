const express = require("express");
const router = express.Router();

//Redirect user based on their login state
router.get('/',(req,res)=>{

    const isLoggedIn = req.session.loggedIn;
    let loginButtonAction = '/login'; // Default action to login page if not logged in
    if (isLoggedIn) {
        loginButtonAction = '/dashboard'; // If logged in, go to the dashboard
    }res.send(`
        <h1>Welcome to Our Landing Page</h1> 
        <button onclick="window.location.href='${loginButtonAction}'">${isLoggedIn ? 'Go to Dashboard' : 'Login'}</button>
  
    `); 
});

//Directing user to browser page (products page)
router.get('/browse',(req,res)=>{
    res.send('<h2>Browse our products here!</h2>');  // Simple rendering example
});




module.exports = router;