const router = require('express').Router();

const addRoutes = require('./addRoutes');
const userRoutes = require('./userRoutes');

router.use('/item', addRoutes);
router.use('/users', userRoutes);

module.exports = router;