const router = require('express').Router();
const Item = require('../models/items'); // Ensure the path and case are correct

// Route to get all items
router.get('/', async (req, res) => {
  try {
    const itemData = await Item.findAll();

    // Debugging: Log itemData to see what it contains
    console.log('itemData:', itemData);

    if (!itemData || itemData.length === 0) {
      // If itemData is null, undefined, or empty, send an error response
      return res.status(404).json({ message: 'No items found' });
    }

    const items = itemData.map((item) => item.get({ plain: true }));
    res.render('home', { items });
  } catch (err) {
    // Log the error for debugging
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
