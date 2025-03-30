// controllers/notificationController.js
const db = require('../db');

const NotificationController = {
    createNotification: (req, res) => {
        const notification = {
            user_id: req.body.userId,
            type: req.body.type,
            content: req.body.content
        };
        db.query('INSERT INTO notifications SET ?', notification, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send('Notification created');
        });
    },

    sendNotification: (userId, type, content) => {
        db.query('SELECT * FROM user_settings WHERE user_id = ?', userId, (settingsErr, settingsResults) => {
            if (settingsErr) {
                console.error(settingsErr);
                return;
            }

            const settings = settingsResults[0];
            if (!settings) return;

            if (settings.site_notifications) {
                console.log(`Site notification sent to user ${userId}: ${content}`);
            }

            if (settings.email_notifications) {
                console.log(`Email notification sent to user ${userId}: ${content}`);
            }

            if (settings.push_notifications) {
                console.log(`Push notification sent to user ${userId}: ${content}`);
            }

            // create notification
            NotificationController.createNotification({ body: { userId, type, content } }, {
                status: () => ({ send: () => { } })
            });
        });
    },

    createInventoryLog: (req, res) => {
        const log = {
            product_id: req.params.productId,
            quantity_change: req.body.quantityChange,
            change_reason: req.body.changeReason
        };
        db.query('INSERT INTO inventory_logs SET ?', log, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send('Inventory log created');
        });
    }
};

module.exports = NotificationController;