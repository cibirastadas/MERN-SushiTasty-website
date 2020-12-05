const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    message : {
        type : Array,
        require : false
    },    
    date : {
        type: String,
        default : Date.now
    }
})

module.exports = mongoose.model("Users", UsersSchema);