import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./commponents/Layouts";
import SignInPage from "./pages/SignIn";
import ChatRoomsPage from "./pages/ChatRooms";

import "./App.css";
import ChatRoomPage from "./pages/ChatRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="signin" element={<SignInPage />} />
          <Route path="chatRooms" element={<ChatRoomsPage />} />
          <Route path="/" element={<Navigate to="/chatRooms" />} />
          <Route path="chatRoom/:id" element={<ChatRoomPage />} />
          <Route path="*" element={<Navigate to="/chatRooms" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
