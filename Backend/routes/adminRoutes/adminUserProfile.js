const express = require('express');
const router = express.Router();
const adminUserProfileController = require('../../controllers/adminUserProfileController');
const authJWT = require('../../middlewares/jwtAuthMiddleware'); // Import auth middleware

// Create user
router.post('/create-users', authJWT.authenticateJWT, authJWT.verifyAdmin, adminUserProfileController.createUser);

// Read all users
router.get('/viewall-users', authJWT.authenticateJWT, authJWT.verifyAdmin, adminUserProfileController.getUsers);

// Read specific user
router.get('/view-user/:id', authJWT.authenticateJWT, authJWT.verifyAdmin, adminUserProfileController.getSpecificUserById);

// Update user
router.put('/update-users/:id', authJWT.authenticateJWT, authJWT.verifyAdmin, adminUserProfileController.updateUser);

// Delete user
router.delete('/delete-users/:id', authJWT.authenticateJWT, authJWT.verifyAdmin, adminUserProfileController.deleteUser);

module.exports = router;