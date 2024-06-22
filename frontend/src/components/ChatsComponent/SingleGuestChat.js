import React, { useState, useEffect } from 'react';
import { Box, FormControl, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import Picker,{ EmojiClickData } from 'emoji-picker-react';
import ScrollableChat from './ScrollableChat';

export default function SingleGuestChat({ selectedChat }) {
    const toast = useToast();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const guestInfo = JSON.parse(localStorage.getItem("guestInfo"));
    const [showPicker,setShowPicker]=useState(false);


    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const response = await fetch("http://localhost:5000/api/message", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${guestInfo.token}`
                },
                body: JSON.stringify({
                    content: newMessage,
                    chatId: selectedChat._id,
                    senderType: "Guest",
                }),
            });

            const data = await response.json();
            setNewMessage("");
            setMessages([...messages, data]);

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
        }
    };

    const fetchAllMessages = async () => {
        if (!selectedChat) {
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/message/${selectedChat._id}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${guestInfo.token}`
                },
            });

            const data = await response.json();
            setMessages(data);
            setLoading(false);
        } catch (error) {
            toast({
                title: 'Unable to load Messages.',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
            setLoading(false);
        }
    };
    const onEmojiClick = (emojiData:EmojiClickData) => {
        setNewMessage((ip)=>ip+emojiData.emoji);
    };

    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && newMessage) {
            sendMessage();
        }
    };

    useEffect(() => {
        fetchAllMessages();
    }, [selectedChat]);

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
                            <Box display="flex" justifyContent="center" alignItems="center"><Text fontSize="30px" fontWeight="bold">Car Owner</Text></Box>
                            <div style={{ display: "flex", flexDirection: "column", overflowY: "scroll" }}>
                                {messages.length > 0 && <ScrollableChat messages={messages} usedBy="Guest" />}
                            </div>
                            </>
                        )}
                    </Box>
                    <Box w="100%" display="flex" alignItems="center" justifyContent="center" cursor="pointer">
                    <Box onClick={()=>{setShowPicker(!showPicker)}} alignSelf="flex-end" ml={2}><span class="material-symbols-outlined">mood</span></Box>
                    {showPicker && <Box position="absolute" bottom="10%" left={{base: "3%", md: "3%", lg: "1.5%"}}><Picker height={300} width={300} onEmojiClick={onEmojiClick}/></Box>}
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