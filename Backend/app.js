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
const decadesRoute = require('./routes/decadesRoute'); // Corrected route import
const adminApprovalRoutes = require('./routes/adminRoutes/adminApproval');

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

// Define routes
app.use("/login", authRoutes); // Login route
app.use("/signup", signUpRoutes); // Signup route
app.use("/checksession", authenticateJWT, sessionRoutes); // Check session route with JWT auth
app.use("/forgot-password", forgotPasswordRoute); // Forgot password route
app.use("/reset-password", resetPasswordRoute); // Reset password route
app.use('/logout', authenticateJWT, logoutRoute); // Logout route with JWT auth
app.use("/dashboard", authenticateJWT, dashboardRoutes); // Dashboard route with JWT auth
app.use("/profile", authenticateJWT, dashboardRoutes); // profile route with JWT auth
app.use('/cart', myCartRoutes); // Cart routes
app.use('/products', productsRoutes); // Products routes
app.use('/decades', decadesRoute); // Decades routes
app.use("/contactUs", contactUsRoutes); // Contact us route
app.use("/sale-products", salesRoutes); // Sale products routes
app.use("/albums/:id/pop-up", popUpRoutes); // Album pop-up routes
app.use('/artists', artistRoutes); // Artists routes
app.use('/best-sellers', bestSellersRoutes); // Best sellers routes
app.use('/newest-addition', newestAdditionRoutes); // Newest addition routes
app.use('/genres', genreRoutes); // Genres routes
app.use("/", wishlistRouter); // Wishlist routes
app.use("/admin-approval", adminApprovalRoutes); // Admin approval routes
app.use("/admin-signup", signUpRoutes); // Admin signup routes

// Start the Express server on a specific port
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});