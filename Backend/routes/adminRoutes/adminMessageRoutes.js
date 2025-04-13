const express = require('express');
const router = express.Router();
const adminMessageController = require('../../controllers/adminMessageController');
const jwt = require('jsonwebtoken');


// Admin-only routes
router.post('/send', adminMessageController.sendAdminMessage);

router.post('/reply', adminMessageController.replyToUserMessage);

router.get('/history', adminMessageController.getAdminMessages);

router.delete('/delete/:messageId',adminMessageController.deleteAdminMessage);

module.exports = router;