const express = require("express");
const dotenv = require("dotenv");
const hbs = require("hbs");
const dotenv = require("dotenv");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

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

//admin
const adminApprovalRoutes = require('./routes/adminRoutes/adminApproval');

const app = express();
const app = express();

// Load environment variables
dotenv.config({ path: "./.env" });

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Middleware to parse incoming request bodies as JSON
app.use(bodyParser.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// Serve static images from the public/images folder
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Routes
app.use("/login", authRoutes);
app.use("/signup", signUpRoutes);
app.use("/checksession", authenticateJWT, sessionRoutes);
app.use("/forgot-password", forgotPasswordRoute);
app.use("/reset-password", resetPasswordRoute);
app.use('/logout', authenticateJWT, logoutRoute);
app.use("/dashboard", authenticateJWT, dashboardRoutes);
app.use('/cart', myCartRoutes);
app.use('/products', productsRoutes);
app.use("/contactUs", contactUsRoutes);
app.use("/sale-products", salesRoutes);
app.use("/albums/:id/pop-up", popUpRoutes);
app.use('/artists', artistRoutes);
app.use('/best-sellers', bestSellersRoutes);
app.use('/newest-addition', newestAdditionRoutes);
app.use('/genres', genreRoutes);
app.use("/", wishlistRouter);

// Admin routes
app.use("/admin-approval", adminApprovalRoutes);
app.use("/admin-signup", signUpRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});