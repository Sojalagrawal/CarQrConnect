import React from 'react';
import { Box, Text,Spacer,MenuButton ,Menu,MenuItem,MenuList,Button,Avatar, MenuDivider} from "@chakra-ui/react";
import {BellIcon,ChevronDownIcon} from '@chakra-ui/icons'
import { ChatState } from "../../Context/ChatProvider";
import Profile from '../miscellaneous/Profile';
import { useNavigate } from 'react-router-dom';


export default function ChatHeader() {
  const navigate=useNavigate();
    const { user } = ChatState();
    const logoutHandler=()=>{
      localStorage.removeItem("userInfo");
      navigate("/");
    }

    return (
        <Box display="flex" justifyContent="space-between" width="100%" border="1px solid green" alignItems="center" bg="white" height="5vh">
            <Spacer/>
              <Menu>
                <MenuButton mr="20px">
                    <BellIcon fontSize="2xl"/>
                </MenuButton>
              </Menu>
              <Menu>
                <MenuButton height={{base:"21px",md:"26px"}} width={{base:"70px",md:"80px",lg:"90px"}} as={Button} rightIcon={<ChevronDownIcon/>} mr="10px">
                    <Avatar size={{base:"xs",lg:"sm"}} cursor="pointer" name={user.name}/>
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
