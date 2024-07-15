const express = require('express');
const { create } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

// Set Handlebars as the templating engine
const hbs = create({ extname: '.hbs', defaultLayout: 'main', layoutsDir: './views/layouts/' });
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Marketplace' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
