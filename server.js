require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { create } = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models');
const sequelize = require('./config/connection'); // Import Sequelize configuration
const SequelizeStore = require('connect-session-sequelize')(session.Store); // For storing sessions in the database

const app = express();
const PORT = process.env.PORT || 3000;

// Set Handlebars as the templating engine
const hbs = create({ extname: '.hbs', defaultLayout: 'main', layoutsDir: './views/layouts/' });
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

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

// Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  db.User.create({
    username: username,
    password: password
  })
  .then(user => {
    res.redirect('/users');
  })
  .catch(err => console.log(err));
});

app.get('/users', (req, res) => {
  db.User.findAll()
    .then(users => {
      res.render('users', { title: 'Users', users });
    })
    .catch(err => console.log(err));
});

app.post('/delete-user', (req, res) => {
  const { id } = req.body;
  db.User.destroy({ where: { id } })
    .then(() => {
      res.redirect('/users');
    })
    .catch(err => console.log(err));
});

app.post('/update-user', (req, res) => {
  const { id, username, password } = req.body;
  db.User.update({ username, password }, { where: { id } })
    .then(() => {
      res.redirect('/users');
    })
    .catch(err => console.log(err));
});

// Sync Sequelize models to the database and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
