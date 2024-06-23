import React, { useState } from 'react';
import {  Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Flex,useMediaQuery } from "@chakra-ui/react";
import QrCode from '../components/Qr/QrCode';
import Scanner from '../components/Qr/Scanner';
import Dashboard from '../components/ChatsComponent/Dashboard';


const ChatPage = () => {
  const [activeTab, setActiveTab] = useState('QrCode');

  const handleTabsChange = (index) => {
    switch (index) {
      case 0:
        setActiveTab('QrCode');
        break;
      case 1:
        setActiveTab('Scanner');
        break;
      case 2:
        setActiveTab('DashBoard');
        break;
      default:
        setActiveTab('DashBoard');
    }
  };
  const [isSmallScreen] = useMediaQuery('(max-width: 650px)');
 
  return (
    <Box width="100vw" display="flex" flexDirection="column"   align="center">

      <Tabs width="100%" onChange={handleTabsChange} position='relative' variant='unstyled' colorScheme='red'>
        <Box  bg="#BAC8D3">
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Text flex="1" textAlign="center"fontWeight="bold" fontSize={{base:"16px",md:"20px"}} ml="4px">CarQrConnect</Text>
          <TabList display="flex" flex="3" justifyContent="space-around">
            <Tab flex="1" textAlign="center">{isSmallScreen ? <span className="material-symbols-outlined">qr_code_2</span> : "QrCode"}</Tab>
            <Tab flex="1" textAlign="center">{isSmallScreen ? <span className="material-symbols-outlined">qr_code_scanner</span> : "Scanner"}</Tab>
            <Tab  flex="1" textAlign="center">{isSmallScreen ? <span className="material-symbols-outlined">chat</span> : "DashBoard"}</Tab>
          </TabList>
        </Flex>
        </Box>
        <TabPanels>
          <TabPanel>
            <QrCode />
          </TabPanel>
          <TabPanel>
            {activeTab === 'Scanner' && <Scanner />}
          </TabPanel>
          <TabPanel>
            <Dashboard/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ChatPage;
