// Importing the User model from the Sequelize models
const router = require('express').Router();
const { User } = require('../models');

// Fetches a user profile based on the user's ID
router.get('/:id', async (req, res) => {
  try {
    // Attempt to retrieve a user by their primary key (ID)
    const user = await User.findByPk(req.params.id);

    // If no user is found, return a 404 Not Found error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If a user is found, return the user data with a 200 OK status
    res.status(200).json(user);
  } catch (error) {
    // If there is an error during the database operation, return a 400 Bad Request error
    res.status(400).json({ error: error.message });
  }
});

// Updates a user profile based on the user's ID
router.put('/:id',  async (req, res) => {
  try {
    // Destructuring name and email from the request body
    const { name, email } = req.body;

    // Attempt to retrieve a user by their primary key (ID)
    const user = await User.findByPk(req.params.id);

    // If no user is found, return a 404 Not Found error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If a user is found, update their name and email
    await user.update({ name, email });

    // Return the updated user data with a 200 OK status
    res.status(200).json(user);
  } catch (error) {
    // If there is an error during the update operation, return a 400 Bad Request error
    res.status(400).json({ error: error.message });
  }
});
