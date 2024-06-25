import React,{useState} from 'react';
// import {useNavigate} from 'react-router-dom';

import {VStack , FormControl,
    FormLabel,
    Button,
    FormHelperText,
    Input,useToast} from '@chakra-ui/react'


export default function GuestLogin({flag,setFlag}) {
    // const navigate=useNavigate();
    const toast = useToast();
    const [phnno,setPhnno]=useState("");
    const [loading,setLoading]=useState(false);
   
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            submitHandler();
        }
    }
    const submitHandler=async()=>{
        setLoading(true);
        if(!phnno){
            toast({
                title: 'Please enter phone number.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position:"top-right",
                
            })
            setLoading(false);
            return;
        }
        if(phnno.length!==10){
            toast({
                title: 'Phone Number must be of length 10.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position:"top-right",
                
            })
            setLoading(false);
            return;
        }
        
        try{
            const response = await fetch("/api/guest", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phnNo: phnno,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }
    
            const data = await response.json();
            console.log(data);
            toast({
                title: 'Logged In Successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:"top-right",
               
            })
            localStorage.setItem("guestInfo",JSON.stringify(data));
            setLoading(false);
            setFlag(true);
            // navigate("/guestchat");
        }
        catch(error){
            toast({
                title: 'Error Occured.',
                description:error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position:"top-right",
            })
            setLoading(false);
        }
        
    }
    const marginCustom={
        base:"2px",
        md:"4px",
        lg:"5px"
    };
    return (
        <VStack spacing={{base: "1", md: "1.5", lg: "2"}} color="black" fontSize={{ base: "sm", md: "xl", lg: "2xl" }} mt={3}>
        
        <FormControl id="phno" isRequired>
            <FormLabel m={marginCustom} fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}}>Phone Number</FormLabel>
            <Input type='number' fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}} placeholder="Enter your phone number" onChange={(e)=>{setPhnno(e.target.value)}} onKeyDown={handleKeyPress}/>
            <FormHelperText m={marginCustom} fontSize={{ base:"11px", md: "14px", lg: "14px" ,xl:"15px"}}>Your privacy is our priority. Your phone number will remain confidential.</FormHelperText>

        </FormControl>

        <Button isLoading={loading} _hover={{ bg: 'red.200' }} fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}} width="100%" style={{marginTop:15}} onClick={submitHandler} bg="red" color="white">Login</Button>
    </VStack>
    )
}
