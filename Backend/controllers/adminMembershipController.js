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