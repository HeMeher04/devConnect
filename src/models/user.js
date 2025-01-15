const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxlength:30
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:10,
        max:90
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Invalid gender");
            }
        }
    },
    photoUrl:{
        type:String
    },
    about:{
        type:String,
        default:"This is default about user"
    },
    skills:{
        type:[String]
    },
},{timestamps : true});

const user= mongoose.model("User",userSchema);
module.exports = user;