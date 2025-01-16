const connectDB = require("./config/database.js");
const express = require("express");
const app = express();
const User = require("./models/user.js");
const bcrypt = require("bcrypt");

const {validateSignUpData} = require("./utils/validation.js")

app.use(express.json()); //express helps to convert json obj to javaScript obj

//Signup taking dynamic data
app.post("/signup",async(req,res)=>{
    
    const {firstName, lastName, emailId, age, password} = req.body;
    try{
        //1. Validate the data
        validateSignUpData(req);
        //2. Hash the password
        const hashPassword = await bcrypt.hash(password,10);
        //3. Create a new user instance
        const user = new User({
            firstName, lastName, emailId,age,
            password:hashPassword,
        })
        //4. save user
        await user.save();
        res.send("User Added sucessfully");
    }
    catch(err){
        res.status(404).send(`Error in signUp", ${err}`)
    }
})

//Login user
app.post("/login",async(req,res)=>{
    const {emailId, password} =req.body;
    try{
        const user = await User.findOne({emailId:emailId});
        if(!user){
            res.send("Please SignUp")
        }
        // const hashPassword = await bcrypt.hash(password)
        const isSame = await bcrypt.compare(password,user.password);
        if(!isSame){
            throw new Error("Invalid Password");
        }
        res.send("Login Sucessful" +user);
    }
    catch(err){
        res.status(400).send("Error"+err);
    }
})


// get data from database
//matching data
app.get("/matchingUser", async(req,res)=>{
    try{
        const user1 = await User.findOne({name:req.body.name});
        if(user1.size==0){
            res.send("No user with given name")
        }
        else{
            console.log("Data sent")
            res.send(user1);

        }
    }
    catch(err){
        res.status(404).send("Error in finding",err)
    }
})

//delete by taking ID
app.delete("/delUser",async(req,res)=>{
    const uid= req.body.userid;
    try{
        const user1 = await User.findByIdAndDelete({_id:uid});
        console.log(user1);
        res.send("User deleted");
    }
    catch(err){
        res.send("Error in deleting",err);
    }
})

//update user === put / patch

app.patch("/update/:userId",async(req,res)=>{
    const user1= req.params?.userId;
    const data=req.body;
    try{
        const allowedUpdate = ["password", "age", "gender","photoUrl","about","skills"];//can update this field only
        const isUpdateAllowed=Object.keys(data).every((k)=>{
            return allowedUpdate.includes(k);
        });
        if(!isUpdateAllowed){
            throw new Error("Update failed not allowed to modify these");
        }
        const user2= await User.findByIdAndUpdate({_id:user1},data,{runValidators:true});
        console.log(user2);
        res.send("user updated");
    }
    catch(err){
        res.status(404).send(`Error in Updating", ${err}`);
    }
})


//find all user in database
app.get("/feed", async(req,res)=>{
    try{
        const alluser = await User.find({}); //pass as empty obj
        if(alluser.size==0){
            res.send("No user with given name")
        }
        console.log("All user Data sent")
        res.send(alluser);
    }
    catch(err){
        res.status(404).send(`Error in finding", ${err}`)
    }
})

//connect to db using mongoose
connectDB()
.then(() => {
    console.log(`\n MongoDB connected !! DB HOST:  `);
    app.listen(3000, () => {
        console.log(`Server is running at port : 3000`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

