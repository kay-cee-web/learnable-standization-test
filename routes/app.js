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


// get route -- for all getting admins
router.get('/admin', (request, response,  next)=>{
    Admin.find({})
        .then((admin)=>{
            response.send(admin);
        });
});


// get route -- for getting avaliable cooked food for the day
router.get('/avaliablefoods', (request, response,  next)=>{
    Food.find({avaliable: "true"})
        .then((food)=>{
            response.send(food);
        });
});



// get route -- for getting all the food in the food menu
router.get('/foods', (request, response, next)=>{
    Food.find({})
        .then((food)=>{
            response.send(food);
        });
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



// get route -- for getting one order
router.get('/orders/:id', (request, response, next)=>{
    Order.findOne({_id: request.params.id}, request.body)
        .then((order)=>{
             response.send(order)
    })
       
});


// get route -- for getting one order
router.get('/foods/:id', (request, response, next)=>{
    Food.findOne({_id: request.params.id}, request.body)
        .then((food)=>{
             response.send(food)
    })
       
});


// get route -- for getting one admin
router.get('/admin/:id', (request, response, next)=>{
    Admin.findOne({_id: request.params.id}, request.body)
        .then((admin)=>{
             response.send(admin)
    })    
});


// get route -- for getting all the orderderd food
router.get('/orders', (request, response, next)=>{
    Order.find({})
        .then((order)=>{
            response.send(order);
        });
});


// put route -- for updating/making some changes on the food menu
router.put('/foods/:id', (request, response, next)=>{
    Food.findByIdAndUpdate({_id: request.params.id}, request.body).then(()=>{
        Food.findOne({_id: request.params.id})
            .then((food)=>{
                 response.send(food)
        });
           
    });
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



// put route -- for  updating admin information
router.put('/admin/:id', (request, response, next)=>{
    Admin.findByIdAndUpdate({_id: request.params.id}, request.body).then(()=>{
        Admin.findOne({_id: request.params.id})
            .then((admin)=>{
                response.send(admin)
        })
           
    })
});


// put route -- for  removing finished avaliable foods 
router.put('/avaliablefoods/:id', (request, response, next)=>{
    Food.findByIdAndUpdate({_id: request.params.id}, request.body).then(()=>{
        Food.findOne({_id: request.params.id})
            .then((food)=>{
                response.send(food)
        })
           
    })
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


// delete route -- for deleting  admin account
router.delete('/admin/:id', (request, response, next)=>{
    Admin.findByIdAndRemove({_id: request.params.id})
        .then((admin)=>{
            response.send(admin);
        })
    
});


// delete route -- for deleting foods from database
router.delete('/foods/:id', (request, response, next)=>{
    Food.findByIdAndRemove({_id: request.params.id})
     .then((food)=>{
        response.send(food);
    })
    
});

