const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Guest = require("../models/guestUser");
const User = require("../models/userModel");



const accessChat = asyncHandler(async (req, res) => {
  
  const { userId } = req.body;
  
  if (!userId ) {
    console.log("User Id or User Type not sent with request");
    return res.sendStatus(400);
  }

  const currentUser = { user: req.user._id };
  const targetUser = { user: userId };

  let isChat = await Chat.find({
        $and: [
          { user1: currentUser.user },
          { user2: targetUser.user },
        ]
      
  }).populate('latestMessage');

  if (isChat.length > 0) {
    isChat = await Chat.populate(isChat, [
      { path: 'user1', select: 'phnNo', model: Guest },
      { path: 'user2', select: 'phnNo', model: User }
    ]);

    res.send(isChat[0]);
  } else {
    // Create a new chat
    const chatData = {
      user1: currentUser.user,
      user2: targetUser.user,
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id })
        .populate({ path: 'user1', select: 'phnNo', model: Guest })
        .populate({ path: 'user2', select: 'phnNo', model: User });

      res.status(200).send(fullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});


const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({
      user2: req.user._id,
    })
      .populate("user1", "phnNo")
      .populate("user2", "phnNo") // Ensure this line is included
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await Chat.populate(results, {
          path: "latestMessage.sender",
          select: "phnNo",
        });

        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


module.exports = { accessChat,fetchChats};