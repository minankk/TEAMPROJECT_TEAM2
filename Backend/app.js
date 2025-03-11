const express = require("express");
const dotenv = require("dotenv");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/login');
const dashboardRoutes = require('./routes/dashboard');
const signUpRoutes = require('./routes/signup');
const contactUsRoutes = require('./routes/contactus');
const productsRoutes = require('./routes/products');
const myCartRoutes = require('./routes/myCart');
const salesRoutes = require('./routes/sales');
const forgotPasswordRoute = require('./routes/forgotPassword');
const popUpRoutes = require('./routes/popUpRoutes');
const resetPasswordRoute = require('./routes/resetPassword');
const artistRoutes = require('./routes/artistRoutes');
const bestSellersRoutes = require('./routes/bestSellers');
const newestAdditionRoutes = require('./routes/newestAddition');
const genreRoutes = require('./routes/genres');
const wishlistRouter = require('./routes/wishlist');

const app = express();

// .env file is created to store all sensitive data and the path is given under dotenv.config
dotenv.config({
    path: "./.env",
});

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
app.use("/", wishlistRouter);
app.use("/login", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/signup", signUpRoutes);
app.use('/cart', myCartRoutes);
app.use('/products', productsRoutes);
app.use("/contactUs", contactUsRoutes);
app.use("/sale-products", salesRoutes);
app.use("/forgot-password", forgotPasswordRoute);
app.use("/albums/:id/pop-up", popUpRoutes);
app.use("/reset-password", resetPasswordRoute);
app.use('/artists', artistRoutes);
app.use('/best-sellers', bestSellersRoutes);
app.use('/newest-addition', newestAdditionRoutes);
app.use('/genres', genreRoutes);

// start the Express server on a specific port
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});