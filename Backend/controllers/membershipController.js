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

//VIP member checkout  with tiered discounts
exports.checkoutAsVIP = async (req, res) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY);
        const userId = decoded.user_id;

        const [user] = await db.execute(`
            SELECT u.membership_status, SUM(o.total_amount) AS total_spent
            FROM users u
            LEFT JOIN orders o ON u.user_id = o.user_id
            WHERE u.user_id = ?
            GROUP BY u.user_id
        `, [userId]);

        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const membershipStatus = user[0].membership_status;
        const totalSpent = user[0].total_spent || 0; 

        const [cartItems] = await db.execute(`
            SELECT SUM(ci.quantity * p.price) AS cart_total
            FROM cart ci
            JOIN products p ON ci.product_id = p.product_id
            WHERE ci.user_id = ?
        `, [userId]);

        const cartTotal = cartItems[0].cart_total || 0;

        // Apply tiered discounts based on total spent
        let discount = 0;
        if (membershipStatus === 'vip') {
            if (totalSpent >= 500) {
                discount = 0.15;  // 15% off for Gold members
            } else if (totalSpent >= 100) {
                discount = 0.10;  // 10% off for Silver members
            } else {
                discount = 0.05;  // 5% off for Bronze members
            }
        }

        const discountedTotal = cartTotal * (1 - discount);

        res.status(200).json({
            message: "Checkout successful",
            originalTotal: cartTotal,
            discountApplied: discount * 100,  // Convert to percentage
            discountedTotal,
        });
    } catch (error) {
        console.error("Error during checkout:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};