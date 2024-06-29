import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/main";
import HeartedUserListPage from "../pages/hearted_users";
import UserProfile from "../pages/user_profile";
import ChatInterface from "../pages/ChatInterface";
import ARpage from "../pages/ARpage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/hearted" element={<HeartedUserListPage />} />
      <Route path="/userprofile/:userId" element={<UserProfile />} />
      <Route path="/chat/:userId" element={<ChatInterface />} />
      <Route path="/ARpage" element={<ARpage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;