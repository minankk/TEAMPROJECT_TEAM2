const db = require('../db');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const he = require('he'); 

exports.contact_us = async (req , res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const safeName = he.encode(name);
  const safeEmail = he.encode(email);
  const safeMessage = he.encode(message);

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    let mailFormat = {
      from: process.env.EMAIL_USER,
      to: "vinylteamproject@gmail.com",
      subject: "New Contact Form Submission",
      text: `Name: ${safeName}\nEmail: ${safeEmail}\nMessage: ${safeMessage}`
    };

    await transporter.sendMail(mailFormat);

    res.status(200).json({ success: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
