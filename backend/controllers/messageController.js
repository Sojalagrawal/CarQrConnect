const asyncHandler = require("express-async-handler");
const Guest = require('../models/guestUser');
const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');
// const accoundSid = process.env.Account_SID;
// const authToken = process.env.Auth_Token;



// const client = require('twilio')(accoundSid, authToken);







// const sendSMS=asyncHandler(async(req,res)=>{
//     const {body,To}=req.body;
//     if(!body || !To){
//         console.log("Invalid data passed into request");
//         return res.sendStatus(400);
//     }
//     let msgOptions={
//         from:process.env.FROM_PHN_NO,
//         to:To,
//         body,
//     };
//     try{
//         const message=await client.messages.create(msgOptions);
//         console.log(message);
//         res.sendStatus(200);
//     }
//     catch(error){
//         res.sendStatus(400);
//         console.log(error);
//     }

// })
const sendMessage=asyncHandler(async(req,res)=>{
    const {content,chatId,senderType}=req.body;
    if(!content || !chatId || !senderType){
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    var newMessage={
        sender:req.user._id,
        senderType:senderType,
        content:content,
        chat:chatId,
    };

    try{
        var message=await Message.create(newMessage);
        message=await message.populate("sender","phnNo");
        message=await message.populate("chat");
        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message,
         })
         res.json(message);
    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }
});


const allMessages=asyncHandler(async(req,res)=>{
    try{
        const messages=await Message.find({chat:req.params.chatId})
        .populate("sender","phnNo")
        .populate("chat");
        res.status(200).json(messages);
    }
    catch(error){
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports={sendMessage,allMessages};