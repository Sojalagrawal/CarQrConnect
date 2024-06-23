import React, { useEffect, useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Box, Text, Button, FormControl, FormLabel, Input, Select,
  Center, VStack, HStack
} from "@chakra-ui/react";
import ReactToPrint from 'react-to-print';

export default function QrCode() {
  const [id, setId] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [fullUrl, setFullUrl] = useState("");
  const [size, setSize] = useState(256);
  const [bgColor, setBgColor] = useState("white");
  const [textColor, setTextColor] = useState("black");
  const [subText, setSubText] = useState("");
  const [displayText, setDisplayText] = useState("Scan my QR code");
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const componentRef = useRef();

  const fetchId = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/encrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
        }),
      });

      const data = await response.json();
      setId(data.encryptedUserId);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchId();
    const url = window.location.href.replace('/chats', '');
    setBaseUrl(url);
  }, []);

  useEffect(() => {
    if (id && baseUrl) {
      const encodedId = encodeURIComponent(id);
      const constructedUrl = `${baseUrl}/${encodedId}`;
      setFullUrl(constructedUrl);
    }
  }, [id, baseUrl]);

  return (
    <>
      <Box border="1px solid black" bg="#77BFD8" mb={4} >
        <Text fontWeight="bold" fontSize={{ base:"20px", md: "25px", lg: "27px" ,xl:"29px"}} textAlign="center">Create Your Own QR Code</Text>
      </Box>
      <Center height="75vh" border="1px solid black">
        <Box width={{ base: "90%", md: "70%" }} border="1px solid red" p={4}>
          <HStack spacing={4} justifyContent="space-evenly" alignItems="flex-start">
            <Box width={{ base: "100%", md: "25%" }} p={2}>

              <FormControl id="bgColor" mb={4}>
                <FormLabel fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}}>Background Color</FormLabel>
                <Select value={bgColor} onChange={(e) => setBgColor(e.target.value)} placeholder="Select background color" fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}}>
                  <option value="white">White</option>
                  <option value="yellow">Yellow</option>
                  <option value="lightblue">Light Blue</option>
                  <option value="lightgreen">Light Green</option>
                  <option value="pink">Pink</option>
                  <option value="lightgray">Light Gray</option>
                </Select>
              </FormControl>
              <FormControl id="textColor" mb={4}>
                <FormLabel fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}}>Text Color</FormLabel>
                <Select value={textColor} onChange={(e) => setTextColor(e.target.value)} placeholder="Select foreground color" fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}}>
                  <option value="black">Black</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="red">Red</option>
                  <option value="purple">Purple</option>
                  <option value="brown">Brown</option>
                </Select>
              </FormControl>
              <FormControl id="displayText" mb={4}>
                <FormLabel fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}}>Display Text</FormLabel>
                <Input
                  type="text"
                  value={displayText}
                  onChange={(e) => setDisplayText(e.target.value)}
                  placeholder="Enter text to display"
                  fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}}
                />
              </FormControl>
              <FormControl id="subText" mb={4}>
                <FormLabel fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}}>Sub Text</FormLabel>
                <Input
                  type="text"
                  value={subText}
                  onChange={(e) => setSubText(e.target.value)}
                  placeholder="Enter subText to display"
                  fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}}
                />
              </FormControl>

            </Box>
            <Box width={{ base: "100%", md: "60%" }} display="flex" flexDirection="column" alignItems="center" border="1px solid green" p={3} borderRadius="lg" justifyContent="space-evenly">
              <Box
                display="flex"
                flexDirection="column"
                borderRadius="lg"
                bg={bgColor}
                p={3}
                ref={componentRef}
                style={{ width: 'fit-content' ,margin: 'auto', maxWidth: '100%' }}
                marginTop={10}
                alignItems="center"
                border="1px solid black"
                
              >
                <Text fontWeight="bold" p={1} fontSize={{ base:"12px", md: "20px", lg: "22px" ,xl:"25px"}} m={0}  color={textColor}
                      style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth:"80%"}}>
                  {displayText}
                </Text>
                <Text fontWeight="bold" p={1} fontSize={{ base:"10px", md: "15px", lg: "18px" ,xl:"21px"}} m={0}  color={textColor}
                      style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth:"80%"}}>
                  {subText}
                </Text>
                {fullUrl && <QRCodeSVG value={fullUrl}  style={{ width: '100%', height: '100%' }} />}
              </Box>
              <Box display="flex" justifyContent="center" p={1} mt={2} >
                <ReactToPrint
                  trigger={() => <Button colorScheme="blue" fontSize={{ base:"8px", md: "15px", lg: "15px" ,xl:"16px"}}>Print QR Code</Button>}
                  content={() => componentRef.current}
                  // pageStyle={`@page { size: auto; margin: 20mm; } @media print { body { -webkit-print-color-adjust: exact; } }`}
                  pageStyle={`@page { size: auto; margin: 20mm; } @media print { body { -webkit-print-color-adjust: exact; } #print-container { transform: scale(20); transform-origin: top left; } }`}
                />
              </Box>
            </Box>
          </HStack>
        </Box>
      </Center>
    </>
  );
}
