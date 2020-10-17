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



// middleware for error handling
app.use((err, req, res, next)=>{
    res.status(422).send({error: err.message})
})


// listen for requests
 app.listen(process.env.port || 3000, ()=>{
     console.log('listening to loocalhost @ port 3000')
 })

