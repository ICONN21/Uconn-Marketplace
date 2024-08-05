const router = require('express').Router();

const addRoutes = require('./addRoutes');
const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes')

router.use('/items', itemRoutes);
router.use('/users', userRoutes);

module.exports = router;