const pug = require('pug');
const express = require('express');
const app = express();
const port = 3000;

// Set express to use pug
app.set('view engine', 'pug');

// Serve src folder as a static folder
app.use('/src', express.static(path.join(__dirname, 'src')));

// Set routes
app.get('/', (req, res) => {
  res.render('index', { name:"pug" })
});

app.get('/profile',  (req, res) => {
  res.render('pages/profile')
});

app.get('/about',  (req, res) => {
  res.render('pages/about')
});

// Listen to port
app.listen(port, () => {
  console.log(`App.js starting at http://localhost:${port}`)
});