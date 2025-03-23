const express = require("express");
const router = express.Router();
const adminMembershipController = require("../../controllers/adminMembershipController");

// Route to cancel VIP membership
router.post("/cancel-vip", adminMembershipController.cancelVIPMembership);

// Route to get VIP members list
router.get("/vip-members",adminMembershipController.getVIPMembersList);


module.exports = router;
