import React from 'react';
import { Box,IconButton } from "@chakra-ui/react";

import { ChatState } from "../../Context/ChatProvider";
import SingleChat from './SingleChat';
import { ArrowBackIcon } from '@chakra-ui/icons';



export default function ChatBox({fetchAgain,toggleFetchAgain}) {
    const { selectedChat,setSelectedChat } = ChatState();

    return (
        <Box  display={{base:selectedChat?"flex":"none",md:"flex"}} bg="bisque"  height="100%" 
            alignItems="center"
            flexDir="column"
            p={3}
            w={{base:"100%",md:"68%"}}
            borderRadius="lg"
            borderWidth="1px"
        >
            {selectedChat?(
                <>
                        <IconButton size="sm" display={{base:"flex",md:"none"}}
                            icon={<ArrowBackIcon/>}
                            onClick={()=>setSelectedChat("")}
                            alignSelf="flex-start"
                        />
                </>
            ):(
                <></>
            )}
            <SingleChat fetchAgain={fetchAgain} toggleFetchAgain={toggleFetchAgain}/>
        </Box>

        //width="66%"
    );
}
