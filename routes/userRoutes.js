const express = require('express');
const router = express.Router();
const profileController = require('../controllers/userController');

// Get user profile
router.get('/:id', profileController.getProfileById);

// Update user profile
router.put('/:id', profileController.updateProfile);

module.exports = router;
