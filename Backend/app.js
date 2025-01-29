/**
 * Importing required modules: 
 * express (framework), 
 * dotenv (environment variables), 
 * hbs (templating engine), 
 * body-parser (request body parsing), 
 * Cors (cross-origin resource sharing).
 */

const express = require("express");
const dotenv = require("dotenv")
const hbs = require("hbs")
const bodyParser = require("body-parser");
const cors = require('cors');
const session = require('express-session');


//Route for login 
const loginRoute = require('./routes/login');
//Dashboard route
const dashboardRoute = require('./routes/dashboard'); 
//Landing Page Route
const landingPageRoute = require('./routes/landingPage');
// Logout Page Route
const logoutRoute = require('./routes/logout');

//.env file is created to store all sensitive data and the path is given under dotenv.config
dotenv.config({
   path : "./.env",
});

// Create an Express application instance
const app = express(); 

// Middleware to parse incoming request bodies as JSON and for CORS => frontend if running on different host
app.use(bodyParser.json());
app.use(cors());

// Session middleware to manage user login state
app.use(session({
    secret: 'hardcodedSecretKey123',   //process.env.SESSION_SECRET || 'your-secret-key', // Use a secret key from environment variable or hardcoded
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // Set to true in production with HTTPS
 }));

/***
 * To use Routes
 * For login
 * For Dashboard
 * For logout
 * For landing page
 */

app.use("/", landingPageRoute);   // entry point
app.use('/login',loginRoute);
app.use('/dashboard', dashboardRoute);
app.use('/logout', logoutRoute);



//start the Express server on a specific port 
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})





