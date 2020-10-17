const express = require('express');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/app')

//setting up an express app
 const app = express();

 //connect to mongo database
 mongoose.connect('mongodb://localhost/madamsaucedb', {useNewUrlParser: true, useUnifiedTopology: true})
 mongoose.Promise = global.Promise;

 app.use(bodyPaser.json());


 // initialize routes
app.use('/api', router );



// middleware for error handling
app.use((err, req, res, next)=>{
    res.status(422).send({error: err.message})
})


// listen for requests
 app.listen(process.env.port || 4000, ()=>{
     console.log('listening to loocalhost @ port 4000')
 })


 //////////////////// PLEASE READ ///////////////////////
 //////////////////// for our route tesing please use ///
 // localhost:3000/api/admin -- post, get, update and delete admin
 // localhost:3000/api/admin/login -- for admin to login
 // localhost:3000/api/users --- post, get, update and delete users
 // localhost:3000/api/users/login --- for a user to login
 // localhost:3000/api/foods -- post, get, update and delete foods
 // localhost:3000/api/avaliablefoods -- for getting all the avaliable for the day foods
 // localhost:3000/api/orders --- post, get, update and delete orders