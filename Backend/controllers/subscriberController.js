const crypto = require("crypto");
const nodemailer = require("nodemailer");
const db = require("../db");

// Email Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// user to subscribe
exports.subscribe = async (req, res) => {
    const { user_id, email, preferences } = req.body; 

    if (!user_id || !email || !preferences.length) {
        return res.status(400).json({ message: "User ID, Email, and Preferences are required" });
    }

    try {
        const token = crypto.randomBytes(32).toString("hex");

        await db.execute("UPDATE users SET subscription_token = ?, subscription_preferences = ? WHERE user_id = ?", 
            [token, JSON.stringify(preferences), user_id]);

        const confirmUrl = `${process.env.FRONTEND_URL}/subscription/confirm/${token}`;

        await transporter.sendMail({
            to: email,
            subject: "Confirm Your Subscription",
            html: `<p>Click <a href="${confirmUrl}">here</a> to confirm your subscription.</p>`,
        });

        res.status(200).json({ message: "Confirmation email sent!" });
    } catch (err) {
        console.error("Error processing request:", err);
        res.status(500).json({ message: "Error processing request", error: err.message });
    }
};



exports.confirmSubscription = async (req, res) => {
    const { token } = req.params;

    try {
        const [rows] = await db.query("SELECT user_id FROM users WHERE subscription_token = ?", [token]);

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const user_id = rows[0].user_id;

        // Update subscription status & remove the token
        await db.query("UPDATE users SET subscription_token = NULL WHERE user_id = ?", [user_id]);

        res.status(200).send("Subscription confirmed! You will receive updates based on your preferences.");
    } catch (err) {
        res.status(500).json({ message: "Error confirming subscription." });
    }
};

exports.unsubscribe = async (req, res) => {
    const { user_id, preference } = req.body; // preference = "blogs" or "newsletter"

    if (!user_id || !preference) {
        return res.status(400).json({ message: "User ID and Subscription Type are required" });
    }

    try {
        const [rows] = await db.query("SELECT subscription_preferences FROM users WHERE user_id = ?", [user_id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        let preferences = JSON.parse(rows[0].subscription_preferences);
        preferences = preferences.filter((p) => p !== preference);

        await db.query("UPDATE users SET subscription_preferences = ? WHERE user_id = ?", 
            [JSON.stringify(preferences), user_id]);

        res.status(200).json({ message: `You have unsubscribed from ${preference}.` });
    } catch (err) {
        res.status(500).json({ message: "Error unsubscribing." });
    }
};

// 4️⃣ Update Subscription Preferences
exports.updatePreferences = async (req, res) => {
    const { user_id, preferences } = req.body; // preferences = ["promotions", "blogs"]

    try {
        await db.query("UPDATE users SET subscription_preferences = ? WHERE user_id = ?", [JSON.stringify(preferences), user_id]);
        res.status(200).json({ message: "Preferences updated!" });
    } catch (err) {
        res.status(500).json({ message: "Error updating preferences." });
    }
};
