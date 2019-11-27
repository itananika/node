const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
console.log('process.env.DB_HOST', process.env.DB_HOST);
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('./models/Item');

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});


/*
app.get('/', (req, res) =>
  Promise.resolve([{name: (new Date()).getTime()}])
    .then(items => res.render('index', { items }))
);

app.post('/item/add', (req, res) =>
  Promise.resolve([{name: req.body.name + '  -> ' + (new Date()).getTime()}])
    .then(items => res.render('index', { items }))
);
*/

const port = 3000;

app.listen(port, () => console.log('Server running...'));
