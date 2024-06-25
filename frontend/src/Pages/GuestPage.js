import React,{useEffect,useState} from 'react';
import { Container, Box, Text } from "@chakra-ui/react";
import GuestLogin from '../components/Authentication/GuestLogin';
import GuestChat from '../components/ChatsComponent/GuestChat';


export default function GuestPage() {
  const [flag,setFlag]=useState(false);

      
    useEffect(()=>{
      const guestUser=JSON.parse(localStorage.getItem("guestInfo"));
      if(guestUser){
        setFlag(true);
      }
    },[flag]);


  return (
    <>
    {!flag && <Container maxW={{base:"md",md:"xl",lg:"2xl"}} centerContent  >
      <Box  d='flex' justifyContent="center" align="center" p={3} bg={"red"}
        width="95%"
        m="40px 80px 15px 80px" borderRadius="lg" borderWidth="2px"
      >
        <Text fontSize={{base:"md",md:"xl",lg:"2xl"}} fontFamily="Work sans" color='white' centerContent>CarQR Connect</Text>
      </Box>
      <Box  bg="white" w="95%" p={4} borderRadius="lg" borderWidth="2px" justifyContent="center" align="center" >
        <Text color='black'fontWeight="500"  m={2}>Guest Login</Text>
        <hr></hr>
        <GuestLogin flag={flag} setFlag={setFlag}/>
        
      </Box>
    </Container>}
    {flag && <GuestChat flag={flag} setFlag={setFlag}/>}
    </>
  )
}
