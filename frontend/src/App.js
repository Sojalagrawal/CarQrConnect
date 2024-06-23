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
        
          <Routes>
            <Route path="/chats" element={<ChatProvider><ChatPage/></ChatProvider>} exact/>
            <Route path="/:id" element={<GuestPage/>} exact/>
            <Route path="/" element={<ChatProvider><Homepage/></ChatProvider>} exact/>
          </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
