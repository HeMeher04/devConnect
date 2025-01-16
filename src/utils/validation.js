const validator = require("validator");

const validateSignUpData = (req)=>{
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Please Enter Name !");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid Email !");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong Password !")
    }
}
module.exports = {
    validateSignUpData
};