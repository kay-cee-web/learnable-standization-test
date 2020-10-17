const express = require('express');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');

//setting up an express app
const app = express();

//connect to mongo database
mongoose.connect('mongodb://localhost/madamsaucedb', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.Promise = global.Promise;

app.use(bodyPaser.json());


// initialize routes
app.use('/api', router );
