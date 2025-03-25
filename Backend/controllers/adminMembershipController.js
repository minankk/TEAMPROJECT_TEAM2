const db = require('../db');

//cancel vip membership
exports.cancelVIPMembership = async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        await db.execute(
            "UPDATE users SET membership_status = 'regular' WHERE user_id = ?",
            [user_id]
        );

        res.status(200).json({ message: "VIP Membership Canceled" });
    } catch (error) {
        console.error("Error canceling VIP:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get List of VIP Members
exports.getVIPMembersList = async (req, res) => {
    try {
        const [vipMembers] = await db.execute(
            "SELECT user_id, user_name, email FROM users WHERE membership_status = 'vip'"
        );

        res.status(200).json(vipMembers);
    } catch (error) {
        console.error("Error fetching VIP members:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get List of Membership Payments for Admin to track VIP payments
exports.getMembershipPaymentsList = async (req, res) => {
    try {
        const [payments] = await db.execute(
            "SELECT mp.membership_payment_id, mp.user_id, u.user_name, u.email, mp.amount, mp.payment_status, mp.payment_date, mp.transaction_id " +
            "FROM membership_payments mp " +
            "JOIN users u ON mp.user_id = u.user_id"
        );

        res.status(200).json(payments);
    } catch (error) {
        console.error("Error fetching membership payments:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};