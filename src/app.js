const connectDB = require("./config/database.js");
const express = require("express");
const app = express();
const User = require("./models/user.js");

//Signup taking dynamic data
app.use(express.json());
app.post("/signup",async(req,res)=>{
    const newobj= new User(req.body)
    try{
        await newobj.save();
        res.send("User Added sucessfully");
    }
    catch(err){
        res.send("Error",err);
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
        res.status(404).send("Error in finding",err)
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

