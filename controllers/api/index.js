const router = require('express').Router();

const dishRoutes = require('./item-routes.js');

router.use('/item', itemRoutes);

module.exports = router;