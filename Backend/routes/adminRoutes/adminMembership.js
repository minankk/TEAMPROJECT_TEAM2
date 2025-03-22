const express = require("express");
const router = express.Router();
const adminMembershipController = require("../../controllers/adminMembershipController");

// Route to cancel VIP membership
router.post("/cancel-vip", adminMembershipController.cancelVIPMembership);


module.exports = router;
