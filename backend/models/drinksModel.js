const mongoose = require("mongoose");

const DrinksChema = mongoose.Schema({

    title :{
        type :String,
        required : true
    }, 
    description :{
        type :String,
        required : true
    }, 
    price :{
        type :String,
        required : true
    }, 
    image :{
        type :String,
        required : true
    }
})

module.exports = mongoose.model("Drinks", DrinksChema);