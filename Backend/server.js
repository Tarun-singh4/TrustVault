const app=require("./src/app.js");
const dotenv=require("dotenv");
const connectDB=require("./src/db/db.js");
dotenv.config();

connectDB();

app.listen(process.env.PORT,()=>{
    console.log("server is running on port 3000");
})