const router = require('express').Router();
const Item = require('../../models/Item');

// ? route to create/add an item using async/await
router.post('/', async (req, res) => {
  try {
    const itemData = await Item.create({
      item_image: req.body.item_image,
      item_title: req.body.item_title,
      item_description: req.body.item_description,
    });
    // ? if the item is successfully created, the new response will be returned as json
    res.status(200).json(itemData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
