const express = require('express');
const router = express.Router();

// Import other route handlers
const itemRoutes = require('./itemRoutes');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

// Use specific routes from other files
router.use('/items', itemRoutes);  // Routes related to item operations
router.use('/users', userRoutes);  // Routes related to user operations
router.use('/auth', authRoutes);   // Routes related to authentication

// Optionally, you can define some general routes here as well
router.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

router.get

// Export the router to be used in the main server setup
module.exports = router;
