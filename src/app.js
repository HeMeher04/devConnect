const express = require("express")
const app= express();

app.get(/.*abye$/,(req,res)=>{
    res.send("Hello World ");
})

app.get("/user",(req,res)=>{
    console.log(req.query);
})

app.get("/user/:uId/:name",(req,res)=>{
    console.log(req.params);
})
app.listen(3000,()=>{
    console.log("Connected !");
})