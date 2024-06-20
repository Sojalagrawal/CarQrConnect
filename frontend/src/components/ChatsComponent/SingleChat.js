import React,{useState} from 'react';
import { Box,Text } from "@chakra-ui/react";

import { ChatState } from "../../Context/ChatProvider";


export default function SingleChat({fetchAgain,setFetchAgain}) {
    const { selectedChat } = ChatState();
    const [messages,setMessages]=useState();
    const [loading,setLoading]=useState(false);
    const [newMessage,setNewMessage]=useState(false);


    return (
        <>
            {selectedChat?(
                <>
                
                    <Box>
                        {/* message */}
                    </Box>
                </>
            ):(
                <Box display="flex" justifyContent="center" alignItems="center" h="100%">
                    <Text fontSize="3xl" fontFamily="Work sans">Click on Informer to start Chatting</Text>
                </Box>
            )}
        
        
        </>
    )
}
