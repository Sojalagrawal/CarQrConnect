const express=require("express");
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const colors=require("colors");
const PORT=process.env.PORT || 5000;
const userRoutes=require("./routes/userRoutes");
const chatRoutes=require("./routes/chatRoutes");
const guestRoutes=require("./routes/guestRoutes");
const messageRoutes=require("./routes/messageRoutes");

const {notFound,errorHandler}=require("./middleware/errorMiddleware");
const cors = require("cors");

const app=express();
app.use(cors());
dotenv.config();
connectDB();
app.use(express.json());



app.get('/',(req,res)=>{
    res.send("API is running");
})

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/guest',guestRoutes);
app.use('/api/message',messageRoutes);


//if all above url doesnt exist then it fall into these middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT,console.log(`Server Started on port ${PORT}`.yellow.bold));





//6fn3hm1KuxuU6VNe
//sojalagrawal