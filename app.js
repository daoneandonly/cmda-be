const pug = require('pug');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const ObjectId = require('mongodb').ObjectId;

// import data from dotenv
dotenv.config()
// require data from data file
const data =  require('./data/data.js');

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DB_URI;
const client = new MongoClient(uri,{ useUnifiedTopology: true });

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

  client.connect()
  .then(async client => {
    let data = []
    const db = client.db("app");
    const collection = db.collection("users");

    data = await collection.find({}).toArray();

    res.render('pages/profile', { people: data } );
  });
});

app.get('/about',  (req, res) => {
  res.render('pages/about', data );
});

app.get('/profile/add', (req, res) => {
  res.render('pages/add-profile')
})

app.post('/profile', (req, res) => {
  console.log('received parsed body:', req.body);

  client.connect().then(async client => {
    const users = client.db("app").collection("users");

    users.insertOne(req.body)
    .then(async () => {
      let data = await users.find({}).toArray();
      res.render('pages/profile', { people: data });
    })
    .catch(error => console.error(error));
  })
});

app.get('/profile/id=:id', (req, res) => {
  const id = req.params.id;

  client.connect().then( async () => {
    const users = client.db("app").collection("users");

    let o_id = new ObjectId(id);
    let userData = await users.findOne({ "_id": o_id });

    res.render('pages/single-profile', { person: userData });
  });
})


app.delete('/profile', (req, res) => {
  console.log('deleting this: ', req.body);
  res.render('pages/profile', data);
});

// Listen to port
app.listen(port, () => {
  console.log(`App.js starting at http://localhost:${port}`);
});
