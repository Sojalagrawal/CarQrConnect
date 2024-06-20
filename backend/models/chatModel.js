const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guest'
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  },
  {
    timestamps: true
  }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;