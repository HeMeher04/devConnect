const express = require("express");

const requestRouter = express.Router();

const {userAuth} = require("../middleware/auth")

requestRouter.post("/sendConnectionRequest",(req,res)=>{
    console.log("Sending Conn Req");
    res.send("Connection Request Sent Sucessfully !");
})

module.exports = requestRouter;