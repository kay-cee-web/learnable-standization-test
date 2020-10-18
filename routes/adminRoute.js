const express = require('express');
const bcrypt = require('bcryptjs');
const router =  express.Router();
const Admin = require('../models/admins');



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


// get route -- for all getting admins
router.get('/admin', (request, response,  next)=>{
    Admin.find({})
        .then((admin)=>{
            response.send(admin);
        });
});


// get route -- for getting one admin
router.get('/admin/:id', (request, response, next)=>{
    Admin.findOne({_id: request.params.id}, request.body)
        .then((admin)=>{
             response.send(admin)
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


// delete route -- for deleting  admin account
router.delete('/admin/:id', (request, response, next)=>{
    Admin.findByIdAndRemove({_id: request.params.id})
        .then((admin)=>{
            response.send(admin);
        })
    
});



