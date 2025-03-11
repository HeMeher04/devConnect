const mongoose =require("mongoose");
const dotenv=require("dotenv");
dotenv.config();

const connectDB = async () => {
        const connectionInstance = await mongoose.connect(`${process.env.URI}/${process.env.DB_Name}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
}

module.exports = connectDB;