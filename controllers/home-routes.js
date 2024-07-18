const router = require('express').Router();
const Item = require('../models/Item');

// ? route to get all dishes
router.get('/', async (req, res) => {
  const itemData = await Item.findAll().catch((err) => {
    res.json(err);
  });
  const items = itemData.map((item) => item.get({ plain: true }));
  res.render('all', { items });
});

module.exports = router;
