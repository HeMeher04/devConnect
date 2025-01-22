const mongoose = require ("mongoose");
const User = require("./user");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    toUserId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:"String",
        required:true,
        enum:{
            values: ["ignored","interested","accepted","rejected"],
            message:"[VALUE] not a status"
        }
    },
},{timestamps:true});

const connectionRequestModel = mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports =connectionRequestModel;
