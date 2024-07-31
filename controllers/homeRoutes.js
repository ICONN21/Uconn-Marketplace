const router = require('express').Router();
const {Item, Favorite, User} = require('../models'); // Ensure the path and case are correct
const withAuth = require('../utils/auth');

// Route to get all items
router.get('/', async (req, res) => {
  try {
    const itemData = await Item.findAll();

    // Debugging: Log itemData to see what it contains
    console.log('itemData:', itemData);

    // if (!itemData || itemData.length === 0) {
    //   // If itemData is null, undefined, or empty, send an error response
    //   return res.status(404).json({ message: 'No items found' });
    // }

    const items = itemData.map((item) => item.get({ plain: true }));
    res.render('home', { items });
  } catch (err) {
    // Log the error for debugging
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/browse', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const itemData = await Item.findAll({
  });

    // Serialize data so the template can read it
    const items = itemData.map((item) => item.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('browse', { 
      items, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/browse', (req, res) => {
//   res.render('browse');
// });

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

// router.get('/favorites', async (req, res) => {
//   try {
//     // Create a new favorite entry with user ID and item ID
//     await Favorite.create({
//       user_id: req.session.user_id,
//       item_id: req.body.item_id,
//     });
// console.log(req.body.user_id)
// console.log(req.session.user_id)
//     // Retrieve all favorites for the logged-in user
//     const favoriteData = await Favorite.findAll({
//       where: {
//         user_id: req.session.user_id,
//       },
//       include: [
//         {
//           model: Item,
//           include: [
//             {
//               model: User,
//               attributes: ['email'],
//             },
//           ],
//         },
//       ],
//     });

//     const favorites = favoriteData.map((favorite) => favorite.get({ plain: true }).item);
// console.log('inside favorites')
//     res.render('favorites', favorites);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// POST route to create a new favorite
router.post('/favorites', async (req, res) => {
  try {
    const newFavorite = await Favorite.create({
      user_id: req.session.user_id,
      item_id: req.body.item_id,
    });
    res.status(201).json(newFavorite);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


// GET route to retrieve favorites
// router.get('/favorites', async (req, res) => {
//   console.log(req.session.user_id)
//   try {
//     if (!req.session.user_id) {
//       return res.status(401).json({ message: "Please log in to view favorites" });
//     }

//     const favoriteData = await Favorite.findAll({
//       where: {
//         user_id: req.session.user_id,
//       },
//       include: [
//         {
//           model: Item,
//           include: [User]
//         },
//       ],
//     });
//     console.log(favoriteData);
//     const favorites = favoriteData ? favoriteData.map(favorite => favorite.get({ plain: true })) : [];
//     console.log(favorites);
//     res.render('favorites', { favorites, logged_in: req.session.logged_in });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

router.get('/favorites', (req, res) => {
  // Simulate fetching favorite items from a database or another data source
  const favoriteItems = [
    { id: 1, title: '3/4ths violin', description: 'Old but gold violin' },
    { id: 2, title: 'chocolate', description: 'really good homemade chocolate' }
    // Add more items as needed
  ];

  // Render the favorites.handlebars template
  res.render('favorites', {
    title: 'Your Favorites',  // You can pass variables to be used in the template
    items: favoriteItems  // Passing the simulated favorite items
  });
});





module.exports = router;
