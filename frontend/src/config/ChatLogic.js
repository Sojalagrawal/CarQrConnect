export const getSender=(loggedUser,chat)=>{
    return chat.latestMessage.sender===loggedUser._id?"You":"Guest User";
}




export const isSameUser=(messages,m,i)=>{
    return i>0 && messages[i-1].sender._id===m.sender._id;
}