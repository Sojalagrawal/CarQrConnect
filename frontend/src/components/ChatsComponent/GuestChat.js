import React, { useEffect, useState } from 'react';
import { Box, useToast,Text,Divider } from "@chakra-ui/react";
import { useParams, useNavigate } from 'react-router-dom';
import SingleGuestChat from './SingleGuestChat';



const GuestChat = ({flag,setFlag}) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const guestInfo = JSON.parse(localStorage.getItem("guestInfo"));
  const [userId, setUserId] = useState("");
  const [selectedChat,setSelectedChat]=useState();


 
  const logoutHandler=()=>{
    localStorage.removeItem("guestInfo");
    setFlag(!flag);
 }
  const decodeId = async () => {
    if(!id){
      return;
    }
    try {
      const response = await fetch("/api/user/decrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ encryptId: id }),
      });

      if (!response.ok) {
        throw new Error('Failed to decode ID');
      }

      const data = await response.json();
      console.log(data.userExists._id);
      setUserId(data.userExists._id);
    } catch (error) {
      toast({
        title: 'Error Occurred',
        description: error.message || 'An error occurred while decoding the ID',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  }


  const accessChat = async () => {
    if (!userId) return;
    try {
        const response = await fetch("/api/chat", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${guestInfo.token}`
            },
            body: JSON.stringify({
                userId:userId
            }),

        });

        const data = await response.json();
        console.log("selected chat");
        console.log(data);
        setSelectedChat(data);
        console.log(data._id);
        
    } catch (error) {
       console.log(error);
    }
};

  useEffect(() => {
    decodeId();
  }, []);


  useEffect(()=>{
    if(userId){
      accessChat();
    }
  },[userId]);


  return (
    <>
      {userId?<Box
        display="flex"
        height="100vh"
        border="1px solid black"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        p={3}
        w={{ base: "100%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box  display="flex" justifyContent="space-between" width="100%">
            <spacer/>
            <Box display="flex" justifyContent="center" alignItems="center"><Text fontSize="30px" fontWeight="bold">Car Owner</Text></Box>
            <Box alignSelf="flex-end" cursor="pointer" onClick={logoutHandler}><span class="material-symbols-outlined">logout</span></Box>
        </Box>
        <Divider borderColor="black" />
        <Box display="flex" flexDir="column" justifyContent="flex-end" p={3} bg="#fae0de" w="100%" h="100%" borderRadius="lg" overflowY="hidden">
           {selectedChat && selectedChat._id && <SingleGuestChat selectedChat={selectedChat} flag={flag} setFlag={setFlag}/>}
        </Box>
      </Box>:<Box display="flex" justifyContent="center" alignItems="center" h="100%">
                    <Text fontSize="3xl" fontFamily="Work sans">No User Found</Text>
        </Box>}
    </>
  );
};

export default GuestChat;












// const isTokenExpired = (token) => {
//   if (!token) return true;

//   const decodedToken = JSON.parse(atob(token.split('.')[1]));
//   const expiryTime = decodedToken.exp * 1000;
//   return Date.now() >= expiryTime;
// };
// const removeTokenIfExpired = () => {
//   const userInfo = JSON.parse(localStorage.getItem("userInfo"));

//   if (userInfo && isTokenExpired(userInfo.token)) {
//       localStorage.removeItem("guestInfo");
//       return true;
//   }

//   return false;
// };


// useEffect(() => {
//   const isExpired = removeTokenIfExpired();
//   if (isExpired) {
//       navigate("/");
//   }
//   else{
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       setUser(userInfo);
//   }
// },[navigate]);