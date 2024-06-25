const express=require("express");
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const colors=require("colors");
const PORT=process.env.PORT || 5000;
const userRoutes=require("./routes/userRoutes");
const chatRoutes=require("./routes/chatRoutes");
const guestRoutes=require("./routes/guestRoutes");
const messageRoutes=require("./routes/messageRoutes");
const path=require('path');

const {notFound,errorHandler}=require("./middleware/errorMiddleware");
const cors = require("cors");

const app=express();
app.use(cors());
dotenv.config();
connectDB();
app.use(express.json());





app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/guest',guestRoutes);
app.use('/api/message',messageRoutes);
// ---------------------------Deployment---------------

const __dirname1=path.resolve();
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname1,'/frontend/build')));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"));
    })
}
else{
    app.get("/",(req,res)=>{
        res.send("API is Running Successfully");
    })
}



//if all above url doesnt exist then it fall into these middlewares
app.use(notFound);
app.use(errorHandler);

const server=app.listen(PORT,console.log(`Server Started on port ${PORT}`.yellow.bold));
const io=require("socket.io")(server,{
    pingTimeout:60000, //ms-->  amount of time it will wait while being inactive-->for 60s if user do not send mssg it close the connection to save bandwidth
    cors:{
        origin:"http://localhost:3000",
    }
});


io.on("connection",(socket)=>{
    // console.log("Connected to socket.io");

    socket.on('setup',(userData)=>{
        socket.join(userData._id);
        // console.log(userData._id);
        socket.emit("connected");
    })

    socket.on("join chat",(room)=>{
        socket.join(room);
        // console.log("User Joined Room " +room);
    })

    socket.on("new message",(newMessageRecieved)=>{
        var chat=newMessageRecieved.chat;
        var senderType=newMessageRecieved.senderType;
        if(senderType=="Guest"){
            socket.in(chat.user2).emit("message recieved",newMessageRecieved);
        }
        else{
            socket.in(chat.user1).emit("message recieved",newMessageRecieved);
        }
        
    })

    socket.on("typing",(room)=>{
        socket.in(room).emit("typing",room);
        // console.log(room);
    });
    socket.on("stop typing",(room)=>{
        socket.in(room).emit("stop typing",room);
        // console.log(room);
    });

    socket.off("setup",()=>{
        // console.log("User Disconnected");
        socket.leave(userData._id);
    });
})






//6fn3hm1KuxuU6VNe
//sojalagrawal