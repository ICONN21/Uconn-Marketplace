const router = require('express').Router();

const itemRoutes = require('./item-routes.js');

router.use('/item', itemRoutes);

module.exports = router;