const express = require (express);
const router = express.Router();

//Importing the mock data from data folder
const users = require('./data/mockData');

// For generating unique user_id ,uuid package
const { v4: uuidv4 } = require('uuid'); 

// For date formatting
const moment = require('moment'); 
const { route } = require('./login');

//Handling a POST request for signup route
router.post("/signup",(req , res)=>{
    const{ userName, email, password, phone_num, role } = req.body; 
})

/***Validation***/
  if (!userName || !email || !password || !phone_num || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  //further validation