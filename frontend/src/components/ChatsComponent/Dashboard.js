import React,{useState} from 'react';
import { ChatState } from "../../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import MyChats from './MyChats';
import ChatBox from './ChatBox';
import ChatHeader from './ChatHeader';

export default function Dashboard() {
    const { user } = ChatState();
    const [fetchAgain,setFetchAgain]=useState(false);

    const toggleFetchAgain=()=>{
        if(fetchAgain){
            setFetchAgain(false);
        }
        else{
            setFetchAgain(true);
        }
    }

    return (
        <div style={{ width: "100%"}}>
            <Box border="1px solid red" bg="#BAC8D3">
                {user && <ChatHeader />}   
                <Box 
                    display="flex" 
                    justifyContent="space-between" 
                    width="100%" 
                    height="83vh" 
                    padding="10px" 
                   
                >
                    {user && <MyChats fetchAgain={fetchAgain}/>}
                    {user && <ChatBox fetchAgain={fetchAgain} toggleFetchAgain={toggleFetchAgain}/>}
                </Box>
            </Box>
        </div>
    );
}
