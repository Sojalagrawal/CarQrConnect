import React, { useState, useEffect } from 'react';
import { Box, useToast, Text, Stack } from "@chakra-ui/react";
import { ChatState } from '../../Context/ChatProvider';
import { getSender } from "../../config/ChatLogic";

export default function MyChats({fetchAgain}) {
  const toast = useToast();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState(); // Assuming these are provided by your ChatState context

  const [loggedUser, setLoggedUser] = useState();

  const fetchChats = async () => {
    if (!user || !user.token) {
      return; // Ensure user and token exist before making API call
    }
    try {
      const response = await fetch("/api/chat", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      });

      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error Occurred.',
        description: "Failed to Load Chats",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(user);
    fetchChats();
  }, [fetchAgain]); 
  

  return (
    <>
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDirection="column"
        alignItems="center"
        p={3}
        bg="#FFE4C4"
        w={{ base: "100%", md: "31%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box>
          <strong>My Chats</strong>
        </Box>
        <Box display="flex" flexDirection="column" p={3} bg="#F8F8F8" w="100%" h="95%" borderRadius="lg" overflowY="hidden">
          {chats && chats.length ? (
            <Stack overflowY="scroll">
              {chats.filter(chat => chat.latestMessage).map((chat) => (
                <Box 
                  key={chat._id}
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#8FCADC" : "#E8E8E8"}
                  color={selectedChat === chat ? "black" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                >
                  <Text fontWeight="bold"> Notifier</Text>
                  {loggedUser && <Text>{getSender(loggedUser, chat)} : {chat.latestMessage.content.substring(0,10)} {chat.latestMessage.content.length>10?"...":""}</Text>}
                </Box>
              ))}
            </Stack>
          ) : (
            <Text>No Chats Available</Text>
          )}
        </Box>
      </Box>
    </>
  );
}
