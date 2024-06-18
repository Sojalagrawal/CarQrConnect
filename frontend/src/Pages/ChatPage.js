import React from 'react'
import { TabIndicator,Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import QrCode from '../Qr/QrCode';
import QrScanner from '../Qr/Scanner';
const ChatPage = () => {
  return (
    <Tabs position='relative' variant='unstyled'colorScheme='red' justifyContent="center" align="center" width="100%">
        <TabList>
          <Tab width="33%">QrCode</Tab>
          <Tab width="33%">Scanner</Tab>
          <Tab width="33%">DashBoard</Tab>
        </TabList>


        
        <TabIndicator mt='-1.5px' height='2px' bg='red.500' borderRadius='1px' />
        <TabPanels>
            <TabPanel>
              <QrCode/>
            </TabPanel>
            <TabPanel>
              <QrScanner/>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
        </TabPanels>
    </Tabs>
  )
}

export default ChatPage