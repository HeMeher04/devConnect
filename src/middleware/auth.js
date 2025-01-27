const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req,res,next)=>{
    try{
        const {token} = req.cookies;
        //validate token
        const decodedMessage = jwt.verify(token,"jk*j7");
        const {_id} = decodedMessage;
        //find User
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not exist");
        }
        // res.send("User :" +user);
        req.user = user; // attaching the user so we can acces in next function.
        next();
    }
    catch(err){
        res.status(400).send("error at userAuth :" +err.message);
    }
}
module.exports = {userAuth};