const router = require('express').Router();
const userRoutes = require('./user-routes');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const itemRoutes = require('./item-routes');

router.use('/item', itemRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/users', userRoutes);

module.exports = router;
