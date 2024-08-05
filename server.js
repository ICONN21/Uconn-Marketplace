require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { create } = require('express-handlebars');
const path = require('path');
const db = require('./models');
const sequelize = require('./config/connection'); // Import Sequelize configuration
const SequelizeStore = require('connect-session-sequelize')(session.Store); // For storing sessions in the database

const routes = require('./controllers');
const helpers = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Set Handlebars as the templating engine
const hbs = create({ 
  extname: '.hbs', 
  defaultLayout: 'main', 
  layoutsDir: path.join(__dirname, 'views/layouts'),
  helpers: helpers // Add helpers configuration here
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const sess = {
  secret: "secret" || process.env.SESSION_SECRET, // Secret key for signing the session ID cookie, from environment variables
  cookie: { secure: true }, // Cookie settings, can be configured for security (e.g., httpOnly, secure)
  resave: false, // Avoid resaving sessions that haven't changed
  saveUninitialized: false, // Save new sessions that have not been modified
  store: new SequelizeStore({
    db: sequelize // Use Sequelize to store session data in the database
  })
};
app.use(session(sess)); // Tell Express to use the session configuration

// Middleware to parse JSON and urlencoded data in request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));


app.use(routes)
// Sync Sequelize models to the database and start the server
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
