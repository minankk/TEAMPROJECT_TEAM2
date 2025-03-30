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

            return res.status(200).json({ message: "Confirmation email sent!",
            token: token
             });
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

//unsubscribe for both registered and guest user
exports.unsubscribe = async (req, res) => {
    const { user_id, email, preference } = req.body;

    if (!preference || !Array.isArray(preference) || preference.length === 0) {
        return res.status(400).json({ message: "At least one subscription type is required." });
    }

    try {
        let affectedRows = 0;
        if (user_id) {
            for (const pref of preference) {
                const [result] = await db.execute(
                    "DELETE FROM subscriptions WHERE user_id = ? AND subscription_type = ?", 
                    [user_id, pref]
                );
                affectedRows += result.affectedRows;
            }
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Subscription not found for the user." });
            }
            return res.status(200).json({ message: `You have unsubscribed from: ${preference.join(", ")}` });

        } else if (email) {
            for (const pref of preference) {
                const [result] = await db.execute(
                    "DELETE FROM guest_subscriptions WHERE email = ? AND subscription_type = ?", 
                    [email, pref]
                );
                affectedRows += result.affectedRows;
            }
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Subscription not found for the guest email." });
            }
            return res.status(200).json({ message: `You have unsubscribed from: ${preference.join(", ")}` });
        } else {
            return res.status(400).json({ message: "User ID or Email is required to unsubscribe." });
        }

    } catch (err) {
        console.error("Error unsubscribing:", err);
        res.status(500).json({ message: "Error unsubscribing." });
    }
};

