const express = require("express");

const requestRouter = express.Router();

const {userAuth} = require("../middleware/auth");
const User = require("../models/user")
const ConnectionRequest = require("../models/connectionRequest");
//sending Conn
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        const fromId = req.user._id;
        const toId = req.params.toUserId;
        const status = req.params.status;
        //1. toId should be in database
        const istoId = User.find({_id:toId});
        if(!istoId){
            return res.status(404).json({message:"User not found"});
        }
        //2. Connection request already exist (A->B) or (B->A)
        const existingConn = ConnectionRequest.find( { $or : [
            {fromUserId:fromId, toUserId:toId} ,
            {fromUserId:toId , toUserId:fromId}
            ]
        })
        if(existingConn.length){
            return res.status(400).send("Conn already exist")
        }
        //3. Allowed Status
        const allowedStatus = ["interested","ignored"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({status , message:" is Not Allowed"})
        }
        //4. is sending request to self
        if(fromId ==toId){
            return res.status(400).json({message:"Cannot send request to self"})
        }

        const conn =new ConnectionRequest({
            fromUserId : fromId,
            toUserId : toId,
            status:status
        });
        const data = await conn.save();
        res.json({
            message:"connection send sucessfully",
            data
        });
    }
    catch(err){
        res.status(400).send("Error in sending request: "+err);
    }
})

//Accept /reject the conn
requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const {status,requestId} = req.params;
        //status should be accept or reject 
        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).send("Not a valid status "+status);
        }
        //find conn where toUserId should be loggedin user, fromId should be in database, status should be intrested
        const conn= await ConnectionRequest.findOne({
            _id: requestId,
            toUserId:loggedInUser._id,
            status:"interested",
        });
        if(!conn){
            return res.status(400).json({message: "Not a valid Connection"});
        }
        conn.status = status;
        const data = await conn.save();
        res.send("Connection "+ status +" "+ data);
    }
    catch(err){
        res.json({message:"Error in review : ",
            err})
    }
})


module.exports = requestRouter;