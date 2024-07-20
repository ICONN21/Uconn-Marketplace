const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set Handlebars as the view engine with the new layout name
app.engine('handlebars', engine({ defaultLayout: 'welcome' }));
app.set('view engine', 'handlebars');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Render the home page
app.get('/', (req, res) => {
    res.render('intro', {
        title: 'Welcome to UCONN Marketplace',
        welcomeTitle: 'Welcome to UCONN Marketplace',
        welcomeLink: 'https://github.com/other-person/homepage'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
