const pug = require('pug');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// require data from data file
const data =  require('./data/data.js');

// Set express to use pug
app.set('view engine', 'pug');

// Serve src folder as a static folder
app.use('/static', express.static(path.join(__dirname, 'static')));

// Set routes
app.get('/', (req, res) => {
  res.render('index', data )
});

app.get('/profile',  (req, res) => {
  res.render('pages/profile', data )
});

app.get('/about',  (req, res) => {
  res.render('pages/about', data )
});

// Listen to port
app.listen(port, () => {
  console.log(`App.js starting at http://localhost:${port}`)
});
