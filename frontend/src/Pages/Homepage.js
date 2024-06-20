import React, { useEffect } from 'react';

import { Container, Box, Text,Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from '../components/Authentication/Login';
import SignUp from '../components/Authentication/SignUp';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate=useNavigate();
  const marginCustom={
    base:"-8px",
    md:"0px",
    lg:"2px"
  };
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("userInfo"));
    if(user){
      navigate("/chats");
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
        <Tabs colorScheme='red'justifyContent="center" align="center">
          <TabList>
            <Tab width="50%" fontSize={{ base:"12px", md: "15px", lg: "16px" ,xl:"17px"}} mt={marginCustom}>Login</Tab>
            <Tab width="50%" fontSize={{ base:"12px", md: "15px", lg: "16px" ,xl:"17px"}} mt={marginCustom}>Sign Up</Tab>
          </TabList>

          <TabPanels >
            <TabPanel >
              <Login/>
            </TabPanel>
            <TabPanel>
              <SignUp/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage