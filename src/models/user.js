const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt =require("bcrypt");

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30
    },
    lastName:{
        type:String,
        minlength:3,
        maxlength:30
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Invalid Password");
            }
        }
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

//helper function
userSchema.methods.getJWT =async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id}, "jk*j7", {expiresIn:'3d'});

    return token;
}

userSchema.methods.validatePassword = async function(password){
    const user = this;
    const isSamePassword = await bcrypt.compare(password, user.password);
        if (!isSamePassword) {
            throw new Error("Invalid Password");
        }
    return isSamePassword;
}

const user= mongoose.model("User",userSchema);
module.exports = user;