const express = require("express");

const profileRouter = express.Router();

const {userAuth} = require("../middleware/auth")


// Profile API
profileRouter.get("/profile", userAuth, async(req,res)=>{
    try{
        //const user = await User.findById(_id);
        const user = req.user;//finding user from middleware
        res.send(user);
    }
    catch(err){
        res.status(400).send("Error in Profile API",err)
    }
})

module.exports = profileRouter;