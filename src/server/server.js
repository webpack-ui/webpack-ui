const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8080;
const OldScaffolderRouter = require("./routers/oldScaffolder.js");

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../build/')));

app.use('/', OldScaffolderRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listening on PORT 3000`);
});
