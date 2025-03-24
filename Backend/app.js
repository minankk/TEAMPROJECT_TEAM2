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
const nodemailer = require('nodemailer');

//.env file is created to store all sensitive data and the path is given under dotenv.config
dotenv.config({
  path : "./.env",
})
 
const authJWT = require('./middlewares/jwtAuthMiddleware');
const authRoutes = require('./routes/login');
const signUpRoutes = require('./routes/signup');
const sessionRoutes = require('./routes/checksession');
const forgotPasswordRoute = require('./routes/forgotPassword');
const resetPasswordRoute = require('./routes/resetPassword');
const logoutRoute = require('./routes/logout');
const dashboardRoutes = require('./routes/dashboard');
const contactUsRoutes = require('./routes/contactus');
const productsRoutes = require('./routes/products');
const myCartRoutes = require('./routes/myCart');
const orderRoutes = require('./routes/order');
const salesRoutes = require('./routes/sales');
const artistRoutes = require('./routes/artistRoutes');
const bestSellersRoutes = require('./routes/bestSellers');
const newestAdditionRoutes = require('./routes/newestAddition');
const genreRoutes = require('./routes/genres');
const wishlistRouter = require('./routes/wishlist');
const decadesRoutes = require('./routes/decadesRoute');
const subscribeRoutes = require('./routes/subscribe');
const popUpRoutes = require('./routes/popUpRoutes');
const membershipRoutes = require('./routes/membership');


//admin
const adminApprovalRoutes = require('./routes/adminRoutes/adminApproval');
const adminUserProfileRoutes = require('./routes/adminRoutes/adminUserProfile');
const adminMembershipRoutes = require("./routes/adminRoutes/adminMembership");

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
 
/***
 * To use Routes
 */
app.use(express.json());
 
app.use("/login", authRoutes);
app.use("/signup", signUpRoutes);
app.use("/forgot-password",forgotPasswordRoute)
app.use("/reset-password",resetPasswordRoute)
app.use('/products', productsRoutes);
app.use("/contactUs",contactUsRoutes)
app.use("/sale-products",salesRoutes)
app.use("/pop-up", popUpRoutes);
app.use('/artists', artistRoutes);
app.use('/best-sellers', bestSellersRoutes);
app.use('/newest-addition', newestAdditionRoutes);
app.use('/genres', genreRoutes);
app.use("/subscribe", subscribeRoutes)
app.use("/decades",decadesRoutes)

//protected Routes for users 
app.use("/checksession",authJWT.authenticateJWT , sessionRoutes)
app.use('/logout',authJWT.authenticateJWT,logoutRoute)
app.use("/dashboard",authJWT.authenticateJWT, dashboardRoutes);
app.use("/profile",authJWT.authenticateJWT, dashboardRoutes)
app.use('/cart',authJWT.authenticateJWT, myCartRoutes);
app.use("/wishlist", authJWT.authenticateJWT,wishlistRouter);
app.use("/membership", authJWT.authenticateJWT ,membershipRoutes)
app.use('/orders', authJWT.authenticateJWT ,orderRoutes);


//admin
app.use("/admin-approval", adminApprovalRoutes);
app.use("/admin-signup", signUpRoutes);
app.use("/admin-dashboard",authJWT.authenticateJWT ,authJWT.verifyAdmin ,adminUserProfileRoutes);
 
 
//start the Express server on a specific port
const port = process.env.PORT || 5001;
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})
 
 