// Import necessary Node.js modules
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const dotenv = require('dotenv');
const sequelize = require('./config/connections'); // Import Sequelize configuration
const SequelizeStore = require('connect-session-sequelize')(session.Store); // For storing sessions in the database

// Load environment variables from the .env file
dotenv.config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000; // Port the server will listen on, from environment variables or default to 3000

// Set up Handlebars as the view engine for rendering views
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware to parse JSON and urlencoded data in request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
const sess = {
  secret: process.env.SESSION_SECRET, // Secret key for signing the session ID cookie, from environment variables
  cookie: {}, // Cookie settings, can be configured for security (e.g., httpOnly, secure)
  resave: false, // Avoid resaving sessions that haven't changed
  saveUninitialized: true, // Save new sessions that have not been modified
  store: new SequelizeStore({
    db: sequelize // Use Sequelize to store session data in the database
  })
};
app.use(session(sess)); // Tell Express to use the session configuration

// Import routes from the routes directory
const routes = require('./routes');
app.use(routes); // Use the imported routes for handling requests

// Sync Sequelize models to the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`)); // Start the server and log the listening port
});
