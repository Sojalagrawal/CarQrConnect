import React, { useEffect, useState } from 'react';
import { Box, useToast } from "@chakra-ui/react";
import { useParams, useNavigate } from 'react-router-dom';

const GuestChat = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const guestInfo = JSON.parse(localStorage.getItem("guestInfo"));
  const guestId = guestInfo ? guestInfo._id : null;
  const [userId, setUserId] = useState("");
  const [validUserId, setValidUserId] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const decodeId = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/decrypt", {
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
      console.log(data.decryptedData);
      setUserId(data.decryptedData);
    } catch (error) {
      setFetchError(error.message);
      // toast({
      //   title: 'Error Occurred',
      //   description: error.message || 'An error occurred while decoding the ID',
      //   status: 'error',
      //   duration: 3000,
      //   isClosable: true,
      //   position: "top-right",
      // });

      // setTimeout(() => {
      //   navigate("/");
      // }, 3000); // Wait for the toast to display before navigating away
      console.error("Decode ID Error:", error);
    }
  }

  const checkUserId = async () => {
    if (!userId) return;

    try {
      const response = await fetch("http://localhost:5000/api/user/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to find User');
      }

      const data = await response.json();
      console.log("User Exists:", data);
      setValidUserId(true);
      setFetchError(null); // Clear previous fetch errors if any
    } catch (error) {
      setFetchError(error.message);
      // toast({
      //   title: 'User Does Not Exist',
      //   description: error.message || 'An error occurred while checking the user ID',
      //   status: 'error',
      //   duration: 3000,
      //   isClosable: true,
      //   position: "top-right",
      // });

      console.error("Check User ID Error:", error);
    }
  }

  useEffect(() => {
    decodeId();
  }, []);

  useEffect(() => {
    if (userId) {
      checkUserId();
    }
  }, [userId]);

  // useEffect(() => {
  //   if (validUserId) {
  //     console.log("Valid user detected");
  //     // Proceed with any other logic if needed when a valid user is detected
  //   }
  // }, [validUserId]);

  return (
    <>
      {validUserId?<Box
        display="flex"
        height="100vh"
        border="1px solid red"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        p={3}
        w={{ base: "100%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          height="80%"
          width="80%"
          bg="red.200"
          justifyContent="center"
          alignItems="center"
        >
          {/* Add your guest chat UI here */}
        </Box>
      </Box>:<>No User Found</>}
    </>
  );
};

export default GuestChat;
