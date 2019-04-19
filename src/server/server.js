// import express/mongoose
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const cors = require('cors');

const PORT = 3000;
app.use(cors());

const uri = process.env.MONGO_URI || 'mongodb://climbcode28:send514@ds145146.mlab.com:45146/webpackui';


// import controller
// const webpackUIController = require('./Controller');
const webpackUIRouter = express.Router();

// initialize app w/ body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// connect mongoDB
mongoose.connect(uri, { useNewUrlParser: true },
  (err) => {
    if (err) console.log(err);
    else console.log('Connected to the database!');
  },
);

app.use(express.static(path.join(__dirname, '../../build')));

app.use('/webpackui', webpackUIRouter);

// run server w/ port 3000
app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listening on PORT ${PORT}`);
});
