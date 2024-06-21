import "./App.css";
import {BrowserRouter,Route, Routes} from "react-router-dom";
import Homepage from './Pages/Homepage';
import ChatPage from "./Pages/ChatPage";
import GuestPage from "./Pages/GuestPage";
// import GuestChat from "./Pages/GuestChat";
import ChatProvider from './Context/ChatProvider';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ChatProvider>
          <Routes>
            <Route path="/chats" element={<ChatPage/>} exact/>
            <Route path="/:id" element={<GuestPage/>} exact/>
            <Route path="/" element={<Homepage/>} exact/>
            {/* <Route path="/guestchat" element={<GuestChat/>} exact/> */}
          </Routes>
        </ChatProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
