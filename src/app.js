const connectDB = require("./config/database.js");
const express = require("express");
const app = express();
const User = require("./models/user.js");

//Signup using hardcore
app.post("/signup",async(req,res)=>{
    const newobj= new User({
        name:"Hemsagar Meher",
        email:"hemsagar@gmail.com",
        age:27
    })
    await newobj.save();
    res.send("User Added sucessfully")
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

