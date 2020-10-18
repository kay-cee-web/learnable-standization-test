const express = require('express');
const bcrypt = require('bcryptjs');
const router =  express.Router();
const Food = require('../models/foods');
const Admin = require('../models/admins');
const Order = require('../models/orders');
const User = require('../models/users');


















// post route -- for ordering food
router.post('/orders', (request, response, next)=>{
    Order.create(request.body).then((order)=>{
        response.send(order);
    })
    .catch(next);
});



















// get route -- for getting one order
router.get('/orders/:id', (request, response, next)=>{
    Order.findOne({_id: request.params.id}, request.body)
        .then((order)=>{
             response.send(order)
    })
       
});








// get route -- for getting all the orderderd food
router.get('/orders', (request, response, next)=>{
    Order.find({})
        .then((order)=>{
            response.send(order);
        });
});















// put route -- for  updating orders 
router.put('/orders/:id', (request, response, next)=>{
    Order.findByIdAndUpdate({_id: request.params.id}, request.body).then(()=>{
        Order.findOne({_id: request.params.id})
            .then((order)=>{
                response.send(order)
        })
           
    })
});











// delete route -- for deleting deleting orders
router.delete('/orders/:id', (request, response, next)=>{
    Order.findByIdAndRemove({_id: request.params.id})
        .then((order)=>{
             response.send(order);
    })
    
});


module.exports = router;

