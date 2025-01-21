const express = require("express");
const profileRouter = express.Router();

const {userAuth} = require("../middleware/auth");
const {validateProfileEditData} =require("../utils/validation");


// Profile API
profileRouter.get("/profile/view", userAuth, async(req,res)=>{
    try{
        const user = req.user;//finding user from middleware
        res.send(user);
    }
    catch(err){
        res.status(400).send("Error in Profile API",err)
    }
})

//Edit profile
profileRouter.patch("/profile/edit", userAuth , async(req,res)=>{
    try{
        if(!validateProfileEditData(req)){
            throw new Error("This field can't be modified");
        }
        //validate the new data (data sanitization)
        const user = req.user; //from userAuth Middleware
        const newData = req.body;
        console.log(user);
        Object.keys(newData).forEach(
            (key)=>{
                user[key] = newData[key];
            }
        )
        await user.save();
        res.send(`${user.firstName} Your data Update Sucessfully`);
    }
    catch(err){
        res.status(400).send("Error in Profile edit : "+err)
    }
})

module.exports = profileRouter;