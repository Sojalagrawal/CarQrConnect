import React,{useEffect} from 'react';
import { Container, Box, Text,Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import GuestLogin from '../components/Authentication/GuestLogin';
import { Navigate, useNavigate } from 'react-router-dom';

export default function GuestPage() {
  const navigate=useNavigate();
    const marginCustom={
        base:"-8px",
        md:"0px",
        lg:"2px"
      };

      
    useEffect(()=>{
      const user=JSON.parse(localStorage.getItem("guestInfo"));
      if(user){
        navigate("/guestchat");
      }
    },[navigate]);

  return (
    <Container maxW={{base:"md",md:"xl",lg:"2xl"}} centerContent  >
      <Box  d='flex' justifyContent="center" align="center" p={3} bg={"red"}
        width="95%"
        m="40px 80px 15px 80px" borderRadius="lg" borderWidth="2px"
      >
        <Text fontSize={{base:"md",md:"xl",lg:"2xl"}} fontFamily="Work sans" color='white' centerContent>CarQR Connect</Text>
      </Box>
      <Box  bg="white" w="95%" p={4} borderRadius="lg" borderWidth="2px" justifyContent="center" align="center" >
        <Text color='black'fontWeight="500"  m={2}>Guest Login</Text>
        <hr></hr>
        <GuestLogin/>
        
      </Box>
    </Container>
  )
}
