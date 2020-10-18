const express = require('express');
const bcrypt = require('bcryptjs');
const router =  express.Router();
const User = require('../models/users');


// post route -- for registering users
router.post('/users', (request, response, next)=>{
    User.create(request.body).then((user)=>{
        response.send(user);
    })
   .catch(next);
});


// post route -- for loging users in
router.post("/users/login", async (request, response) => {
    try {
        var user = await User.findOne({ email: request.body.email }).exec();
        if(!user) {
            return response.status(400).send({ message: "The email does not exist" });
        }
        if(!bcrypt.compareSync(request.body.password, user.password)) {
            return response.status(400).send({ message: "The password is invalid" });
        }
        response.send({ message: "Login successful" });
    } catch (error) {
        response.status(500).send(error);
    }
});


// get route -- for getttng all users
router.get('/users', (request, response, next)=>{
    User.find({})
        .then((user)=>{
            response.send(user);
        });
});


// get route -- for getting one user
router.get('/users/:id', (request, response, next)=>{
    User.findOne({_id: request.params.id}, request.body)
        .then((user)=>{
             response.send(user)
    })
       
});


// put route -- for updating   users information
router.put('/users/:id', (request, response, next)=>{
    User.findByIdAndUpdate({_id: request.params.id}, request.body).then(()=>{
        User.findOne({_id: request.params.id})
            .then((user)=>{
                 response.send(user)
        })
           
    })
});


// delete route -- for deleting delete a user
router.delete('/users/:id', (request, response, next)=>{
    User.findByIdAndRemove({_id: request.params.id})
        .then((user)=>{
             response.send(user);
    })
    
});


module.exports = router;