const mongoose =require("mongoose");

const connectDB = async () => {
        const connectionInstance = await mongoose.connect("mongodb+srv://userHem:hemsagar123@hemcluster.ylk9m.mongodb.net/devConn")
        // console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
}

module.exports = connectDB;