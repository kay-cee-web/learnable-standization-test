const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//validate that all required fields are filled out
//before sending details to database
const OrderSchema = new Schema({
    customerName:{
        type: String,
        required: [true, 'Please fill your full name']
    },
    foodName:{
        type: String,
        required: [true, 'please tell us the food name']
    },
    phone:{
        type: String,
         required: [true, 'Phone number field is required']
    },
  
    officeNumber: {
        type: String,
        required: [true, 'Office number feild is required']

    }
})


const Order = mongoose.model('order', OrderSchema);
module.exports = Order;