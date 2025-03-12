const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');

const authenticateJWT = require('./middlewares/jwtAuthMiddleware');
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
const salesRoutes = require('./routes/sales');
const popUpRoutes = require('./routes/popUpRoutes');
const artistRoutes = require('./routes/artistRoutes');
const bestSellersRoutes = require('./routes/bestSellers');
const newestAdditionRoutes = require('./routes/newestAddition');
const genreRoutes = require('./routes/genres');
const wishlistRouter = require('./routes/wishlist');
const decadesRoutes = require('./routes/decadesRoute');
//admin
const adminApprovalRoutes = require('./routes/adminRoutes/adminApproval');
const adminUserProfileRoutes = require('./routes/adminRoutes/adminUserProfile');
const { verify } = require("jsonwebtoken");

const app = express();

// Load environment variables from .env file
dotenv.config({
    path: "./.env",
});

// Middleware to parse incoming request bodies as JSON
app.use(bodyParser.json());

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});

// Serve static files from the 'public/images' folder
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Middleware to enable CORS with dynamic origin from .env
app.use(cors({
    origin: process.env.FRONTEND_URL, // Use FRONTEND_URL from .env
    credentials: true,
}));

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

app.use("/login", authRoutes); 
app.use("/signup", signUpRoutes);
app.use("/checksession",authenticateJWT.authenticateJWT , sessionRoutes)
app.use("/forgot-password",forgotPasswordRoute)
app.use("/reset-password",resetPasswordRoute)
app.use('/logout',authenticateJWT.authenticateJWT,logoutRoute)
app.use("/dashboard",authenticateJWT.authenticateJWT, dashboardRoutes);
app.use("/profile",authenticateJWT.authenticateJWT , dashboardRoutes)
app.use('/cart', myCartRoutes);
app.use('/products', productsRoutes);
//app.use('/decades', decadesRoutes);
app.use("/contactUs",contactUsRoutes)
app.use("/sale-products",salesRoutes)
app.use("/albums/:id/pop-up", popUpRoutes); 
app.use('/artists', artistRoutes);
app.use('/best-sellers', bestSellersRoutes);
app.use('/newest-addition', newestAdditionRoutes);
app.use('/genres', genreRoutes);
app.use("/", wishlistRouter);
//admin
app.use("/admin-approval", adminApprovalRoutes);
app.use("/admin-signup", signUpRoutes);
app.use("/admin-dashboard",authenticateJWT.authenticateJWT ,authenticateJWT.verifyAdmin ,adminUserProfileRoutes);


// Start the Express server on a specific port
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});