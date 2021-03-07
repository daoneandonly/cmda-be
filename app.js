const pug = require('pug');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');


// require data from data file
const data =  require('./data/data.js');

// Set express to use pug
app.set('view engine', 'pug');

// Serve src folder as a static folder
app.use('/static', express.static(path.join(__dirname, 'static')))
   .use(bodyParser.urlencoded({ extended: true }));

// Handle errors
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Set routes
app.get('/', (req, res) => {
  res.render('index', data )
});

app.post('/add', (req, res) => {
  console.log('Got body:', req.body);
  data.desc = req.body.desc;
  console.log(data);
  res.render('index', data);
});

app.get('/profile',  (req, res) => {
  res.render('pages/profile', data );
});

app.get('/about',  (req, res) => {
  res.render('pages/about', data );
});

app.post('/profile', (req, res) => {
  console.log('received parsed body:', req.body);
  data.person[req.body.itemKey] = req.body.itemValue;

  res.render('pages/profile', data);
});

app.delete('/profile', (req, res) => {
  console.log('deleting this: ', req.body)
  res.render('pages/profile', data);
});

// Listen to port
app.listen(port, () => {
  console.log(`App.js starting at http://localhost:${port}`);
});
