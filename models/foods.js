const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//validate that all required fields are filled out
//before sending details to database
const FoodSchema = new Schema({
    foodName:{
        type: String,
        required: [true, 'Name field is required']
    },
    price:{
        type:Number,
        required: [true, 'price field is required']
    },
    ingredent:{
        type: String,
        required: [true, 'ingredient field is required']
    },
    avaliable: {
        type: String,
        default:false

    }
})


const Food = mongoose.model('food', FoodSchema);
module.exports = Food;