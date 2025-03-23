const express = require("express");
const router = express.Router();
const adminMembershipController = require("../../controllers/adminMembershipController");

// Route to cancel VIP membership
router.post("/cancel-vip", adminMembershipController.cancelVIPMembership);

// Route to get VIP members list
router.get("/vip-members",adminMembershipController.getVIPMembersList);

// Route to get VIP members payment tracking 
router.get("/vip-members/payment",adminMembershipController.getMembershipPaymentsList);


module.exports = router;
