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

const validateProfileEditData = (req)=>{
    try{
        const user =req.user;
        const allowedChange=[
            "firstName",
            "lastName",
            "age",
            "gender",
            "photoUrl",
            "about",
            "skills",
        ]
        const newData = req.body;
        const isEditAllowed = Object.keys(newData).every((field)=>{
            return allowedChange.includes(field); 
        })
        return isEditAllowed;
    }
    catch(err){
        throw new Error("Edit error" + err.message);
    }
}

module.exports = {
    validateSignUpData,
    validateProfileEditData
};