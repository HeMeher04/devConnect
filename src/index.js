const connectDB = require("./config/database.js");
const express = require("express");
const app = express();

connectDB()
.then(() => {
    app.listen(3000, () => {
        console.log(`Server is running at port : 3000`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

