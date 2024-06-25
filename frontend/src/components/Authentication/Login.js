import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {VStack , FormControl,
    FormLabel,
    InputGroup,
    Button,
    InputRightElement,
    Input,useToast} from '@chakra-ui/react'

const Login = () => {
    const navigate=useNavigate();
    const toast = useToast();
    const [show,setShow]=useState(false);
    const [name,setName]=useState("");
    const [phnno,setPhnno]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const handleClick=()=>{
        if(show){
            setShow(false);
        }
        else{
            setShow(true);
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            submitHandler();
        }
    }
    const submitHandler=async()=>{
        setLoading(true);
        if(!name || !phnno || !password){
            toast({
                title: 'Please fill all the Fields.',
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
            const response = await fetch("/api/user/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    phnNo: phnno,
                    password: password,
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
            localStorage.setItem("userInfo",JSON.stringify(data));
            setLoading(false);
            navigate("/chats");
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
        <VStack spacing={{base: "1", md: "1.5", lg: "2"}} color="black" fontSize={{ base: "sm", md: "xl", lg: "2xl" }}>
        <FormControl id="name" isRequired fontSize={{base:"10px",md:"20px",lg:"30px"}}>
            <FormLabel fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}} m={marginCustom}>Name</FormLabel>
            <Input type='text'  fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}} placeholder="Enter your name" onChange={(e)=>{setName(e.target.value)}} onKeyDown={handleKeyPress}/>
        </FormControl>
        <FormControl id="phno" isRequired>
            <FormLabel m={marginCustom} fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}}>Phone Number</FormLabel>
            <Input type='number' fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}} placeholder="Enter your phone number" onChange={(e)=>{setPhnno(e.target.value)}} onKeyDown={handleKeyPress}/>
        </FormControl>

        <FormControl id="Password" isRequired>
            <FormLabel m={marginCustom} fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}}>Password</FormLabel>
            <InputGroup>
            <Input type={show?'text':'password'} fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}} placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}} onKeyDown={handleKeyPress}/>
            <InputRightElement  width="9.5 rem">
                <Button fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}} h="1.75rem" size="sm" m={1} onClick={handleClick}>{show?"Hide":"Show"}</Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>

        
        <Button isLoading={loading} _hover={{ bg: 'red.200' }} fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}} width="100%" style={{marginTop:15}} onClick={submitHandler} bg="red" color="white">Login</Button>
    </VStack>
    )
}

export default Login