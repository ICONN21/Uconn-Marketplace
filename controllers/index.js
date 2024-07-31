const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const itemRoutes = require('./api/itemRoutes');

router.use('/item', itemRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
