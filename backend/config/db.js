const mongoose=require("mongoose");

const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb Connected ${conn.connection.host}`.cyan.underline)
        
    } catch (error) {
        console.log(`Error:${error.message}`.red.underline);
        process.exit();
    }
}

module.exports=connectDB;