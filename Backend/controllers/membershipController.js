const db = require('../db');
const jwt = require('jsonwebtoken')
const dashboardController = require('../controllers/dashboardController');


//redirect to payment gateway to upgrade as VIP members
exports.redirectToPaymentGateway = (req, res) => {
    res.status(200).json({
        message: "Redirecting to payment gateway...",
        paymentGatewayURL: "https://mockpaymentgateway.com/checkout"
    });
};

exports.processPayment = async (req, res) => {
    try {
        const userId = req.user.user_id;

        const { paymentMethod, amount } = req.body;

        if (!paymentMethod || !amount) {
            return res.status(400).json({ message: "Payment method and amount are required." });
        }

        const paymentSuccess = Math.random() > 0.2;  // 80% chance of success, 20% chance of failure
        const transactionId = `txn_${Math.random().toString(36).substring(2, 15)}`;

        if (paymentSuccess) {
            await db.execute("UPDATE users SET membership_status = 'vip' WHERE user_id = ?", [userId]);
            await db.execute(
                "INSERT INTO membership_payments (user_id, amount, payment_status, payment_method, transaction_id) VALUES (?, ?, 'paid', ?, ?)",
                [userId, amount, paymentMethod, transactionId]
            );

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
        const userId = req.user.user_id; 

        const [user] = await db.execute(`
            SELECT u.membership_status, COALESCE(SUM(o.total_amount), 0) AS total_spent
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
        console.log(`Membership Status: ${membershipStatus}, Total Spent: ${totalSpent}`);

        // Get VIP benefits and discount percentage
        let discountInfo = { tier: "No VIP", discount: 0 };
        if (membershipStatus === 'vip') {
            discountInfo = dashboardController.genBenefitsDiscount(totalSpent);
        }

        const discountedTotal = cartTotal * (1 - discountInfo.discount);

        res.status(200).json({
            message: "Checkout successful",
            membershipTier: discountInfo.tier,
            originalTotal: cartTotal,
            discountApplied: discountInfo.discount * 100, 
            discountedTotal,
        });

    } catch (error) {
        console.error("Error during checkout:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
