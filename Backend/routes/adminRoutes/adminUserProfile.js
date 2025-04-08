const express = require('express');
const router = express.Router();
const adminUserProfileController = require('../../controllers/adminUserProfileController');

// Create user
router.post('/create-users',  adminUserProfileController.createUser);

// Read all users
router.get('/viewall-users', adminUserProfileController.getUsers);

// Read specific user
router.get('/view-user/:id',  adminUserProfileController.getSpecificUserById);

// Update user
router.put('/update-users/:id',  adminUserProfileController.updateUser);

// Delete user
router.delete('/delete-users/:id', adminUserProfileController.deleteUser);

module.exports = router;