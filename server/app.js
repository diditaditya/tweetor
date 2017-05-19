const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

mongoose.connect('mongodb://localhost/tweetor')

let index = require('./routes/index');

const app = express();

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/', index);

let port = 3000;
app.listen(port);
console.log(`listening to port ${port}`);
