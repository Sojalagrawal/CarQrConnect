import React from 'react';
import { Box,Spacer,MenuButton ,Menu,MenuItem,MenuList,Button,Avatar, MenuDivider,Badge} from "@chakra-ui/react";
import {BellIcon,ChevronDownIcon} from '@chakra-ui/icons'
import { ChatState } from "../../Context/ChatProvider";
import Profile from '../miscellaneous/Profile';
import { useNavigate } from 'react-router-dom';


export default function ChatHeader() {
  const navigate=useNavigate();
    const { user,notification,setSelectedChat ,setNotification} = ChatState();
    const logoutHandler=()=>{
      localStorage.removeItem("userInfo");
      navigate("/");
    }

    return (
      
        <Box display="flex" justifyContent="space-between" width="100%" border="1px solid black" alignItems="center" bg="#ECDAE0" height="5vh">
            <Spacer/>
              <Menu>
                <MenuButton mr="20px" position="relative">
                    <BellIcon fontSize="2xl"/>
                    {notification.length > 0 && (
                      <Badge borderRadius="full"
                      position="absolute"
                      top="-1"
                      right="-1" 
                      colorScheme='red'>{notification.length} </Badge>
                    )}
                </MenuButton>
                <MenuList>
                  {!notification.length && "No New Messages"}
                  {notification.map((notif)=>(
                    <MenuItem key={notif._id} onClick={()=>{
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n)=>n.chat._id!==notif.chat._id)); //remove notification
                    }}>
                      New Message from Notifier
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton height={{base:"21px",md:"26px"}} width={{base:"70px",md:"80px",lg:"90px"}} as={Button} rightIcon={<ChevronDownIcon/>} mr="10px">
                    <Avatar size={{base:"xs",lg:"sm"}} cursor="pointer" name={user.name} bg="red"/>
                </MenuButton>
                <MenuList>
                    <MenuItem><Profile user={user}/></MenuItem>
                    <MenuDivider/>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
        </Box>
        
    );
}
