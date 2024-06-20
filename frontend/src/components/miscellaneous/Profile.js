import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
  Box
} from '@chakra-ui/react';

export default function Profile({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box width="100%" onClick={onOpen}>
        <Text>My Profile</Text>
      </Box>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={{ base: "45%", md: "35%", lg: "30%" }} >
          <ModalHeader  fontSize={{base:"17px"}}  >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem' fontSize={{base:"15px"}}>
              {user.phnNo}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' size="sm" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
