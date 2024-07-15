// Import bcrypt for password hashing and the User model
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Handles user registration
exports.signup = async (req, res) => {
  try {
    // Extracting name, email, and password from request body
    const { name, email, password } = req.body;

    // Hashing the password with a salt round of 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user in the database with hashed password
    const user = await User.create({ name, email, password: hashedPassword });

    // Storing user's ID in session to keep them logged in
    req.session.userId = user.id;

    // Returning the created user object with a status of 201
    res.status(201).json(user);
  } catch (error) {
    // If an error occurs, return a status of 400 with the error message
    res.status(400).json({ error: error.message });
  }
};

// Handles user login
exports.login = async (req, res) => {
  try {
    // Extracting email and password from request body
    const { email, password } = req.body;

    // Finding the user by email
    const user = await User.findOne({ where: { email } });

    // Checking if user exists and if the provided password matches the stored hash
    if (!user || !await bcrypt.compare(password, user.password)) {
      // If authentication fails, return a status of 401 with an error message
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // If authentication is successful, store user's ID in session
    req.session.userId = user.id;

    // Return the user object with a status of 200
    res.status(200).json(user);
  } catch (error) {
    // If an error occurs, return a status of 400 with the error message
    res.status(400).json({ error: error.message });
  }
};

// Handles user logout
exports.logout = (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      // If an error occurs while destroying the session, return a status of 500
      return res.status(500).json({ error: err.message });
    }
    // If logout is successful, return a status of 200 with a success message
    res.status(200).json({ message: 'Logged out successfully' });
  });
};
