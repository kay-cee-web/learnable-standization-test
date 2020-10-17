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