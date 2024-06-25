import React, { useState, useEffect } from 'react';
import { Box, FormControl, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import Picker,{ EmojiClickData } from 'emoji-picker-react';
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";



import { ChatState } from "../../Context/ChatProvider";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
const ENDPOINT="";
var socket,selectedChatCompare;

export default function SingleChat({ fetchAgain, toggleFetchAgain }) {
    const toast = useToast();
    const { user,notification,setNotification } = ChatState();
    const { selectedChat } = ChatState();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [showPicker,setShowPicker]=useState(false);
    const [socketConnected,setSocketConnected]=useState(false);
    const [typing,setTyping]=useState(false);
    const [istyping,setIsTyping]=useState(false);

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    

    const fetchAllMessages = async () => {
        if (!selectedChat) {
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`/api/message/${selectedChat._id}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
            });

            const data = await response.json();
            setMessages(data);
            setLoading(false);
            socket.emit("join chat",selectedChat._id);
        } catch (error) {
            toast({
                title: 'Unable to load Messages.',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
            // console.log(error);
            setLoading(false);
        }
    };

    useEffect(()=>{
        socket=io(ENDPOINT);
        socket.emit('setup',user);
        socket.on("connected",()=>{setSocketConnected(true)});
        socket.on("typing",(room)=>{
            
            if(selectedChatCompare && room===selectedChatCompare._id){
                setIsTyping(true);
            }
            
            
        });
        socket.on("stop typing",(room)=>{
            if(selectedChatCompare && room===selectedChatCompare._id){
                setIsTyping(false);
            }
            
        });
        
    },[]);

    

    useEffect(() => {
        fetchAllMessages();
        selectedChatCompare=selectedChat;
    }, [selectedChat]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        socket.emit("stop typing",selectedChat._id);

        try {
            const response = await fetch("/api/message", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    content: newMessage,
                    chatId: selectedChat._id,
                    senderType: "User",
                }),
            });

            const data = await response.json();
            setNewMessage("");
            setMessages([...messages, data]);
            toggleFetchAgain();
            setShowPicker(false);
            socket.emit("new message",data);

            toast({
                title: 'Message sent successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        } catch (error) {
            toast({
                title: 'Unable to send Message.',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
            // console.log(error);
        }
    };


    

    
    useEffect(()=>{
        socket.on("message recieved",(newMessageRecieved)=>{
            if(!selectedChatCompare || selectedChatCompare._id!==newMessageRecieved.chat._id){
                if(!notification.includes(newMessageRecieved)){
                    setNotification([...notification,newMessageRecieved]);
                    toggleFetchAgain();
                }
            }
            else{
                setMessages([...messages,newMessageRecieved]);
                toggleFetchAgain();
            }
        })
    })
    

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if(!socketConnected){
            return;
        }

        if(!typing){
            setTyping(true);
            socket.emit("typing",selectedChat._id);
        }
        let lastTypingTime=new Date().getTime();
        var timerLength=3000;
        setTimeout(() => {
            var timeNow=new Date().getTime();
            var timeDiff=timeNow-lastTypingTime;

            if(timeDiff>=timerLength && typing){
                socket.emit("stop typing",selectedChat._id);
                setTyping(false);
            }
        }, timerLength);

    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && newMessage) {
            sendMessage();
        }
    };
    const onEmojiClick = (emojiData:EmojiClickData) => {
        setNewMessage((ip)=>ip+emojiData.emoji);
    };
    
    return (
        <>
            {selectedChat ? (
                <>
                    <Box display="flex" flexDir="column" justifyContent="flex-end" p={3} bg="#E8E8E8" w="100%" h="100%" borderRadius="lg" overflowY="hidden">

                        {loading ? (
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='red.500'
                                alignSelf="center"
                                margin="auto"
                                w={20}
                                h={20}
                            />
                        ) : (
                            <>
                            <div style={{display:"flex",flexDirection:"column",overflowY:"scroll"}}>
                                <ScrollableChat messages={messages} usedBy="User" user={user}/>
                            </div>
                            {istyping?<div><Lottie width={60} options={defaultOptions} style={{marginLeft:0,marginBottom:15}}/></div>:<></>}

                            </>
                        )}
                    </Box>
                    <Box w="100%" display="flex" alignItems="center" justifyContent="center" cursor="pointer">
                        <Box onClick={()=>{setShowPicker(!showPicker)}} alignSelf="flex-end" ml={2}><span class="material-symbols-outlined">mood</span></Box>
                        {showPicker && <Box position="absolute" bottom="13%" left={{base: "5%", md: "5%", lg: "33.5%"}}><Picker height={300} width={300} onEmojiClick={onEmojiClick}/></Box>}
                        
                        <FormControl onKeyDown={handleKeyPress} isRequired mt={3} ml={4} w="98%">
                            
                            <Input variant="filled" placeholder="Enter a message" onChange={typingHandler} value={newMessage}></Input>
                        </FormControl>
                        <Box alignSelf="flex-end" ml={2} onClick={sendMessage}>
                            <span className="material-symbols-outlined">
                                send
                            </span>
                        </Box>
                    </Box>
                </>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" h="100%">
                    <Text fontSize="3xl" fontFamily="Work sans">Click on Informer to start Chatting</Text>
                </Box>
            )}
        </>
    );
}
