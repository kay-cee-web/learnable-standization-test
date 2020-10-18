const express = require('express');
const bcrypt = require('bcryptjs');
const router =  express.Router();
const Food = require('../models/foods');


// post route -- for adding food to food menu
router.post('/foods', (request, response, next)=>{
    Food.create(request.body)
        .then((food)=>{
            response.send(food);
         })
        .catch(next);
});


// get route -- for getting all the food in the food menu
router.get('/foods', (request, response, next)=>{
    Food.find({})
        .then((food)=>{
            response.send(food);
        });
});

// get route -- for getting one order
router.get('/foods/:id', (request, response, next)=>{
    Food.findOne({_id: request.params.id}, request.body)
        .then((food)=>{
             response.send(food)
    })
       
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


// put route -- for  removing finished avaliable foods 
router.put('/avaliablefoods/:id', (request, response, next)=>{
    Food.findByIdAndUpdate({_id: request.params.id}, request.body).then(()=>{
        Food.findOne({_id: request.params.id})
            .then((food)=>{
                response.send(food)
        })
           
    })
});


// delete route -- for deleting foods from database
router.delete('/foods/:id', (request, response, next)=>{
    Food.findByIdAndRemove({_id: request.params.id})
     .then((food)=>{
        response.send(food);
    })
    
});


module.exports = router;
