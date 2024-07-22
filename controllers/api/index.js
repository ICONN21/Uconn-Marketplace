const router = require('express').Router();

const addRoutes = require('./add-routes.js');

router.use('/item', addRoutes);

module.exports = router;