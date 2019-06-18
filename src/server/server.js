import { join } from 'path';
import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import OldScaffolderRouter from "./routers/oldScaffolder.js";

const app = express();
const PORT = 8080;
require('dotenv').config();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, '../../build/')));

app.use('/', OldScaffolderRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listening on PORT 3000`);
});
