const express = require("express");

const authRouter = express.Router();

const User = require("../models/user.js");
const bcrypt = require("bcrypt");

const { validateSignUpData } = require("../utils/validation.js")


//Signup taking dynamic data
authRouter.post("/signup", async (req, res) => {

    const { firstName, lastName, emailId, age, password } = req.body;
    try {
        //1. Validate the data
        validateSignUpData(req);
        //2. Hash the password
        const hashPassword = await bcrypt.hash(password, 10);
        //3. Create a new user instance
        const user = new User({
            firstName, lastName, emailId, age,
            password: hashPassword,
        })
        //4. save user
        await user.save();
        res.send("User Added sucessfully");
    }
    catch (err) {
        res.status(404).send(`Error in signUp", ${err}`)
    }
})

//Login user
authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            res.send("Please SignUp")
        }
        const isSamePassword = await user.validatePassword(password);
        //add jwt token
        const token = await user.getJWT();
        //add token to cookie
        res.cookie("token", token ,
            {expires: new Date(Date.now() + 8*3600000)}  //optional (expire)
        );
        // console.log(token);
        res.send("Login Sucessful" + user);
    }
    catch (err) {
        res.status(400).send("Error" + err);
    }
})

//Logout user
authRouter.post("/logout", async(req,res)=>{
    try {
        res.cookie("token",null,
            {expires: new Date(Date.now())}
        )
        res.send("Logout Sucessful");
    }
    catch (err) {
        res.status(400).send("Error in Logout: " + err);
    }
})

module.exports = authRouter;