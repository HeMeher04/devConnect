const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    age:{
        type:Number
    }
})

const user= mongoose.model("User",userSchema);
module.exports = user;