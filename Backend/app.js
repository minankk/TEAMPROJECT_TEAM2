//This line imports the Express framework into your Node.js project and assigns it to the variable express.
const express = require("express");
//This line import the dotenv package into your Node.js project. The dotenv package is used for loading environment variables(.env file) into process.env in Node.js
const dotenv = require("dotenv")
// This line imports the hbs module a popular templating engine for Node.js applications.
const hbs = require("hbs")
//This helps to parse the incoming request bodies in a middleware before your handlers (controllers) process them.
const bodyParser = require("body-parser");


//.env file is created to store all sensitive data and the path is given under dotenv.config
dotenv.config({
   path : "./.env",
});

// Create an Express application instance
const app = express(); 


//path folder for interacting with frontend file to fetch the files too
//const publicLocation = path.join(__dirname, "./public");
//app.use(express.static(publicLocation));
//app.set("view engine" , "hbs")

// Middleware to parse incoming request bodies as JSON
app.use(bodyParser.json());

//to use the routes for login
app.use("/",require("./routes/login"));


//start the Express server on a specific port 
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})





