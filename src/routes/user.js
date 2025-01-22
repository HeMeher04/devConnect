const express = require("express");
const userRouter = express.Router();
const connectionRequest = require("../models/connectionRequest");
const {userAuth} = require("../middleware/auth")

//get all pending conn request
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const requestData = await connectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
        }).populate("fromUserId" ,
             ["firstName", "lastName", "age", "skills", "photoUrl", "about"]);
        res.json({message: "Fetched data : ",
            data: requestData});
    }
    catch(err){
        res.status(400).json({message:"Error in getting user request"}, err);
    }
})

//get all connection of the loggedin user
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const REQUIRED_FIELD = ["firstName", "lastName", "age", "skills", "photoUrl", "about"];
        const connList = await connectionRequest.find({
            $or:[{fromUserId : loggedInUser._id }, {toUserId : loggedInUser._id}],
            status:"accepted",
        })
        .populate("fromUserId",REQUIRED_FIELD)
        .populate("toUserId",REQUIRED_FIELD); 

        const requestInfo = connList.map(
            (val)=>{
                if(val.fromUserId._id.toString() == loggedInUser._id.toString()){
                    return val.toUserId;
                }
                return val.fromUserId;
            })
        res.json({message: "Fetched data : ",
            data: requestInfo});
    }
    catch(err){
        res.status(400).json({message:"Error in getting user connection"}, err);
    }
})

module.exports = userRouter;
