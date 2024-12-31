const express = require("express")
const app= express();

app.use("/hello",(req,res)=>{
    res.send("Hello World ");
})

app.listen(3000,()=>{
    console.log("Connected !");
})