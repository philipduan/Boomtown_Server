const { mongoose } = require('./db/mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { Item } = require('./models/item');
const { User } = require('./models/user');

const app = express(); //App is now an instance of our express server
const PORT = process.env.PORT || 3001;

//Body Parser it parses the body of our clients requires
//Everytime our client sends some sor of information to our server
//It'll transform it into JSON for our db
app.use(bodyParser.json());
//This middleware allows our form data to be used in our server
app.use(bodyParser.urlencoded({ extended: true }));

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://boomtown-server-phil.herokuapp.com/'
  );
  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);
  // Pass to next layer of middleware
  next();
});

//lets make a simple get request to get some sort of response from our server
app.get('/', (req, res) => {
  res.send('Hello World');
});

//Get all document from the collection User
app.get('/users', (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

//Save new user document in collection User
app.post('/users', (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(user => {
      res.status(200).send('Successfuly saved');
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

//Get all document from the collection Items
app.get('/items', (req, res) => {
  Item.find({})
    .populate('itemowner')
    .then(items => {
      res.status(200).send(items);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

//Save new item document in collection Item
app.post('/items', (req, res) => {
  const item = new Item(req.body);
  item
    .save()
    .then(item => {
      res.status(200).send('Successfully saved');
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.patch('/items', (req, res) => {
  Item.findByIdAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        available: req.body.available,
        borrower: req.body.borrower
      }
    },
    { new: true }
  )
    .then(item => {
      res.status(200).send(item);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
