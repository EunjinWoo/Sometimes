import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/main";
import HeartedUserListPage from "../pages/hearted_users";
import UserProfile from "../pages/user_profile";
import ChatInterface from "../pages/ChatInterface";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<MainPage />} />
      <Route path="/hearted" element={<HeartedUserListPage />} />
      <Route path="/userdetail" element={<UserProfile />} />
      <Route path="/chat" element={<ChatInterface />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;