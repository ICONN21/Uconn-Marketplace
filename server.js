require('dotenv').config();
const express = require('express');
const { create } = require('express-handlebars');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Set Handlebars as the templating engine
const hbs = create({ extname: '.hbs', defaultLayout: 'main', layoutsDir: './views/layouts/' });
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// Serve static files
app.use(express.static('public'));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
