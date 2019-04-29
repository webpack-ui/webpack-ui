// import express/mongoose
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const webpackUIRouter = require('./webpackui');


require('dotenv').config();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../../build')));

app.use('/webpackui', webpackUIRouter);

// run server w/ port 3000
app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listening on PORT ${PORT}`);
});
