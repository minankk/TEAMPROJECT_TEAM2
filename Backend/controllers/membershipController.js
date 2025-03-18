const db = require('../db');
const jwt = require('jsonwebtoken')

//redirect to payment gateway to upgrade as VIP members
exports.redirectToPaymentGateway = (req, res) => {
    res.status(200).json({
        message: "Redirecting to payment gateway...",
        paymentGatewayURL: "https://mockpaymentgateway.com/checkout"
    });
};

//processing payment
exports.processPayment = async (req, res) => {
    try {
        const token = req.header('Authorization');
        console.log("Received Token:", token);
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY);
        const userId = decoded.user_id;

        const paymentSuccess = Math.random() > 0.2;  // 80% chance of success, 20% chance of failure

        if (paymentSuccess) {
            await db.execute("UPDATE users SET membership_status = 'vip' WHERE user_id = ?", [userId]);
            res.status(200).json({ message: "Payment successful! You are now a VIP member." });
        } else {
            res.status(400).json({ message: "Payment failed. Please try again." });
        }
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};




