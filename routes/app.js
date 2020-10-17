const express = require('express');
const bcrypt = require('bcryptjs');
const router =  express.Router();
const Food = require('../models/food');
const Admin = require('../models/admin');
const Order = require('../models/order');
const User = require('../models/user');



// post route -- for adding food to food menu
router.post('/foods', (request, response, next)=>{
    Food.create(request.body)
        .then((food)=>{
            response.send(food);
         })
        .catch(next);
});


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


// post route -- for registering admin
router.post('/admin', (request, response, next)=>{
    Admin.create(request.body).then((admin)=>{
        response.send(admin);
    })
    .catch(next);
});


// post route -- for login admin
router.post("/admin/login", async (request, response) => {
    try {
        var user = await Admin.findOne({ email: request.body.email }).exec();
        if(!user) {
            return response.status(400).send({ message: "This email does not exist" });
        }
        if(!bcrypt.compareSync(request.body.password, user.password)) {
            return response.status(400).send({ message: "The password is invalid" });
        }
        response.send({ message: "Admin login was successful" });
    } catch (error) {
        response.status(500).send(error);
    }
});


// post route -- for ordering food
router.post('/orders', (request, response, next)=>{
    Order.create(request.body).then((order)=>{
        response.send(order);
    })
    .catch(next);
});

