export const getSender=(loggedUser,chat)=>{
    return chat.latestMessage.sender===loggedUser._id?"You":"Guest User";
}


