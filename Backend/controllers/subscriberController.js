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

//to subscribe as registered and guest user
exports.subscribe = async (req, res) => {
    const { user_id, email, preferences } = req.body;
    if (!email || !preferences || !preferences.length) {
        return res.status(400).json({ message: "Email and Preferences are required" });
    }

    try {
        const token = crypto.randomBytes(32).toString("hex");

        if (user_id) {
            for (const preference of preferences) {
                await db.execute(
                    "INSERT INTO subscriptions (user_id, subscription_type) VALUES (?, ?)", 
                    [user_id, preference]
                );
            }

            return res.status(200).json({ message: "Subscription preferences saved!" });

        } else {
            for (const preference of preferences) {
                await db.execute(
                    "INSERT INTO guest_subscriptions (email, subscription_type, subscription_token) VALUES (?, ?, ?)",
                    [email, preference, token]
                );
            }
            const confirmUrl = `${process.env.FRONTEND_URL}/subscription/confirm/${token}`;
            await transporter.sendMail({
                to: email,
                subject: "Confirm Your Subscription",
                html: `<p>Click <a href="${confirmUrl}">here</a> to confirm your subscription.</p>`,
            });

            return res.status(200).json({ message: "Confirmation email sent!" });
        }

    } catch (err) {
        console.error("Error processing subscription:", err);
        res.status(500).json({ message: "Error processing request", error: err.message });
    }
};


//to confirm subscription as guest user
exports.confirmSubscription = async (req, res) => {
    const { token } = req.params;

    try {
        const [rows] = await db.execute(
            "SELECT guest_id FROM guest_subscriptions WHERE subscription_token = ?", 
            [token]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }
        await db.execute(
            "UPDATE guest_subscriptions SET subscription_token = NULL, is_confirmed = TRUE WHERE guest_id = ?", 
            [rows[0].guest_id]
        );

        res.status(200).json({ message: "Subscription confirmed! You will receive updates based on your preferences." });

    } catch (err) {
        console.error("Error confirming subscription:", err);
        res.status(500).json({ message: "Error confirming subscription." });
    }
};

//unsubscribe the registered and guest user
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
