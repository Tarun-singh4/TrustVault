const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();

async function connectDB(){
    try{
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in .env");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is connected");
    }catch{
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}

module.exports=connectDB;