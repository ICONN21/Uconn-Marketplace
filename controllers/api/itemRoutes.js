// Import models from the Sequelize setup
const router = require('express').Router();
const { Item, User, Favorite } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
    try {
      // Retrieve all items and include associated user emails
      const itemData = await Item.findAll({
        include: [
          {
            model: User,
            attributes: ['email'],  // Only include the email attribute from the User model
          },
        ],
      });

      // Convert complex Sequelize objects to a simpler format
      const items = itemData.map((item) => item.get({ plain: true }));

      // Render the 'posts' view, passing in items and logged-in status
      res.render('home', { 
        items,
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      // Handle errors and send a 500 status code
      res.status(500).json(err);
    }
  })

  router.post('/', withAuth, async (req, res) => {
    try {
      // Create a new item using data from request body and session user ID
      const newItem = await Item.create({
        ...req.body,
        user_id: req.session.user_id,
      });

      // Respond with the newly created item and a 200 status code
      res.status(200).json(newItem);
    } catch (err) {
      // Handle errors and send a 400 status code
      res.status(400).json(err);
    }
  })

  router.put('/:id', withAuth, async (req, res) => {
    try {
      // Update item details based on the item ID and request body
      const updatedItem = await Item.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      // Check if the update was successful, if not, send a 404 error
      if (!updatedItem[0]) {
        res.status(404).json({ message: 'No item found with this id!' });
        return;
      }

      // Respond with the updated item
      res.status(200).json(updatedItem);
    } catch (err) {
      // Handle errors and send a 500 status code
      res.status(500).json(err);
    }
  })

  router.delete('/:id', withAuth, async (req, res) => {
    try {
      // Delete an item based on the ID and the user ID from session
      const itemData = await Item.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });

      // Check if the deletion was successful, if not, send a 404 error
      if (!itemData) {
        res.status(404).json({ message: 'No item found with this id!' });
        return;
      }

      // Respond with success message
      res.status(200).json(itemData);
    } catch (err) {
      // Handle errors and send a 500 status code
      res.status(500).json(err);
    }
  })

  router.post('/:id/like', withAuth, async (req, res) => {
    try {
      // Create a new favorite entry with user ID and item ID
      const newFavorite = await Favorite.create({
        user_id: req.session.user_id,
        item_id: req.params.id,
      });

      // Respond with the newly created favorite entry
      res.status(200).json(newFavorite);
    } catch (err) {
      // Handle errors and send a 400 status code
      res.status(400).json(err);
    }
  })

  router.post('/like/:id', async (req, res) => {
    console.log('Hit post endpoint')
    const itemId = req.params.id;
    const userId = req.session.userId;  // Make sure the user ID is stored in session upon login
  (console.log(req.session))
    try {
      // Check if item already exists in favorites
      const existingFavorite = await Favorite.findOne({
        where: { itemId: itemId, userId: userId }
      });
  
      if (!existingFavorite) {
        // Add item to favorites
        await Favorite.create({
          itemId: itemId,
          userId: userId
        });
        res.json({ message: 'Item added to favorites' });
      } else {
        res.status(409).json({ message: 'Item already in favorites' });
      }
    } catch (error) {
      console.error('Failed to add favorite:', error);
      res.status(500).json({ error: 'Failed to add item to favorites' });
    }
  });
  

  // router.get('/favorites', async (req, res) => {
  //   try {
  //     // Retrieve all favorites for the logged-in user and include associated items and user emails
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

  //     // Convert complex Sequelize objects to a simpler format
  //     const favorites = favoriteData.map((favorite) => favorite.get({ plain: true }));

  //     // Render the 'favorites' view with favorites and logged-in status
  //     res.render('favorites', { 
  //       favorites,
  //       logged_in: req.session.logged_in 
  //     });
  //   } catch (err) {
  //     // Handle errors and send a 500 status code
  //     res.status(500).json(err);
  //   }
  // });

  // router.get('/favorites', withAuth, async (req, res) => {
  //   console.log("accessing /favorites")
  //   try {
  //       if (!req.session.user_id) {
  //           return res.status(401).json({ message: "Please log in to view favorites" });
  //       }
  
  //       const favoriteData = await Favorite.findAll({
  //           where: {
  //               user_id: req.session.user_id,
  //           },
  //           include: [{
  //               model: Item,
  //           }]
  //       });
  
  //       const favorites = favoriteData.map(favorite => favorite.get({ plain: true }));
  //       res.render('favorites', { favorites, logged_in: req.session.logged_in });
  //   } catch (err) {
  //       console.error(err);
  //       res.status(500).json(err);
  //   }
  // });

  module.exports = router;