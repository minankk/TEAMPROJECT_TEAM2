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

const path = require('path');

const pageRoutes = require('./routes/landingPage');  
const authRoutes = require('./routes/login');  
const dashboardRoutes = require('./routes/dashboard');
const signUpRoutes = require('./routes/signup'); 
const contactUsRoutes = require('./routes/contactus');
const sessionRoutes = require('./routes/checksession');
const productsRoutes = require('./routes/products');
const myCartRoutes = require('./routes/myCart');

console.log('pageRoutes:', typeof pageRoutes);
console.log('authRoutes:', typeof authRoutes);
console.log('dashboardRoutes:', typeof dashboardRoutes);
console.log('signUpRoutes:', typeof signUpRoutes);
console.log('contactUsRoutes:', typeof contactUsRoutes);
console.log('sessionRoutes:', typeof sessionRoutes);
console.log('productsRoutes:', typeof productsRoutes);
console.log('myCartRoutes:', typeof myCartRoutes);


//.env file is created to store all sensitive data and the path is given under dotenv.config
dotenv.config({
  path : "./.env",
})

// Create an Express application instance
const app = express(); 

// Middleware to parse incoming request bodies as JSON and for CORS => frontend if running on different host
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();  
});

// Serve images from the 'public/images' folder
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use(cors({
  origin: 'http://localhost:3000',  
  credentials: true, 
}));

// To manage user login state
app.use(session({
    secret: 'hardcodedSecretKey123', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true in production with HTTPS
 }));

/***
 * To use Routes
 */
app.use(express.json());
app.use("/", pageRoutes);   // entry point
app.use("/login", authRoutes);  
app.use("/dashboard", dashboardRoutes);
app.use("/signup", signUpRoutes);
app.use('/add', myCartRoutes);
app.use('/products', productsRoutes);
app.use("/contactUs",contactUsRoutes)
app.use("/checksession",sessionRoutes)


//start the Express server on a specific port 
const port = process.env.PORT || 5001;
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})

