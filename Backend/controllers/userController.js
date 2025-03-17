const db = require('../db');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');


// Contact us page logic after clicking submit will be sent to the gmail

    exports.contact_us = async (req , res) => {
     const {name , email , message} = req.body;

     if(!name || !email || !message){
        return res.status(400).json({error : 'All fields are required'})
     } 
     
     try {
        // Set up Nodemailer to send emails
        let transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS 
            }
        });

        // Email format
        let mailFormat = {
            from: process.env.EMAIL_USER,
            to: "vinylteamproject@gmail.com", 
            subject: "New Contact Form Submission",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        // Send email
        await transporter.sendMail(mailFormat);

        res.status(200).json({ success: "Message sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



