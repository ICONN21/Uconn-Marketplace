const router = require('express').Router();
const Item = require('../models/items'); // Ensure the path and case are correct
const withAuth = require('../utils/auth');

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

router.get('/browse', (req, res) => {
  res.render('browse');
});

// Route to render the home page
router.get('/home', (req, res) => {
  res.render('home');
});

// Route to render the post (all) page
router.get('/post', (req, res) => {
  res.render('all');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('login');
});

router.post('/favorites', withAuth, async (req, res) => {
  try {
    // Create a new favorite entry with user ID and item ID
    await Favorite.create({
      user_id: req.session.user_id,
      item_id: req.body.item_id,
    });

    // Retrieve all favorites for the logged-in user
    const favoriteData = await Favorite.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Item,
          include: [
            {
              model: User,
              attributes: ['email'],
            },
          ],
        },
      ],
    });

    const favorites = favoriteData.map((favorite) => favorite.get({ plain: true }).item);

    res.render('favorites', { favorites });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
