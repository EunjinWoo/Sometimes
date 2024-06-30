import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/main";
import HeartedUserListPage from "../pages/hearted_users";
import UserProfile from "../pages/user_profile";
import ChatInterface from "../pages/ChatInterface";
import ARpage from "../pages/ARpage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ChatList from "../pages/ChatList";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/hearted" element={<HeartedUserListPage />} />
      <Route path="/userprofile/:userId" element={<UserProfile />} />
      <Route path="/chat" element={<ChatList />} />
      <Route path="/chat/:userId" element={<ChatInterface />} />
      <Route path="/ARpage" element={<ARpage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;