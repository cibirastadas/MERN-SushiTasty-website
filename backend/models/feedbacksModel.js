const mongoose = require("mongoose");

const FeedbacksSchema = mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    rating : {
        type : String,
        required : true
    },
    userText : {
        type : String,
        required : true
    },
    adminText : {
        type : String,
        required : false
    },
    response : {
        type : Boolean,
        default : false
    },  
    adminDate : {
        type: String,
        require : false
    },
    date : {
        type: String,
        default : Date.now
    } 
    
})

module.exports = mongoose.model("Feedbacks", FeedbacksSchema);