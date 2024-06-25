import React ,{useState}from 'react';
import {useNavigate} from 'react-router-dom';
import {VStack , FormControl,
    FormLabel,
    FormHelperText,Input,
    InputGroup,
    Button,
    InputRightElement,useToast} from '@chakra-ui/react';

const SignUp = () => {
    const navigate=useNavigate();
    const toast = useToast();
    const [show,setShow]=useState(false);
    const [showc,setShowc]=useState(false);
    const [name,setName]=useState("");
    const [phnno,setPhnno]=useState("");
    const [password,setPassword]=useState("");
    const [confirmpassword,setConfirmpassword]=useState("");
    const [loading,setLoading]=useState(false);
    const marginCustom={
        base:"2px",
        md:"4px",
        lg:"5px"
    };
    

    const handleClick=()=>{
        if(show){
            setShow(false);
        }
        else{
            setShow(true);
        }
    }
    const handleClick1=()=>{
        if(showc){
            setShowc(false);
        }
        else{
            setShowc(true);
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            submitHandler();
        }
    }

    const submitHandler=async()=>{
        setLoading(true);
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

        if(!name || !phnno || !password || !confirmpassword){
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
        if (!passwordPattern.test(password)) {
            toast({
                title: 'Password must be at least 12 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special symbol.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
            setLoading(false);
            return;
        }
        if(password!==confirmpassword){
            toast({
                title: 'Passwords Do Not Match.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position:"top-right",
               
            })
            setLoading(false);
            return;
        }
        try{
            const response = await fetch("/api/user", {
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
                title: 'Account Created Successfully.',
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
            console.log(error);
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
    
    return (
        <VStack spacing={{base: "1", md: "1.5", lg: "2"}} color="black">
            <FormControl id="first-name" isRequired fontSize={{base:"10px",md:"20px",lg:"30px"}}>
                <FormLabel fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}} m={marginCustom}>Name</FormLabel>
                <Input type='text'  fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}} placeholder="Enter your name" onChange={(e)=>{setName(e.target.value)}} onKeyDown={handleKeyPress}/>
            </FormControl>

            <FormControl id="phnno" isRequired>
                <FormLabel m={marginCustom} fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}} >Phone Number</FormLabel>
                <Input type='number' fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}} placeholder="Enter your phone number" onChange={(e)=>{setPhnno(e.target.value)}} onKeyDown={handleKeyPress}/>
                <FormHelperText m={marginCustom} fontSize={{ base:"11px", md: "14px", lg: "14px" ,xl:"15px"}}>Your privacy is our priority. Your phone number will remain confidential.</FormHelperText>
            </FormControl>

            <FormControl id="password" isRequired>
                <FormLabel m={marginCustom} fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}}>Password</FormLabel>
                <InputGroup>
                <Input type={show?'text':'password'} fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}} placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}} onKeyDown={handleKeyPress}/>
                <InputRightElement width="9.5 rem">
                    <Button h="1.75rem" fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}} size="sm" m={1} onClick={handleClick}>{show?"Hide":"Show"}</Button>
                </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id="confirmpassword" isRequired>
                <FormLabel m={marginCustom} fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}}>Confirm Password</FormLabel>
                <InputGroup>
                <Input type={showc?'text':'password'} fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}} placeholder="Enter your confirm password" onChange={(e)=>{setConfirmpassword(e.target.value)}} onKeyDown={handleKeyPress}/>
                <InputRightElement width="9.5 rem">
                    <Button fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}} h="1.75rem" size="sm" m={1} onClick={handleClick1}>{showc?"Hide":"Show"}</Button>
                </InputRightElement>
                </InputGroup>
            </FormControl>
           

            <Button _hover={{ bg: 'red.200' }} fontSize={{ base:"12px", md: "15px", lg: "15px" ,xl:"16px"}} width="100%" style={{marginTop:15}} onClick={submitHandler} isLoading={loading} bg="red" color="white">Sign Up</Button>
        </VStack>
    )
}

export default SignUp