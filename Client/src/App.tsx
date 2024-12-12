import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import ProfilePage from "./pages/UserProfile/userprofile";
import Login from "./pages/LogingPage/LoginPage";
import SignUp from "./pages/SignUp/signup";
import "./main.css";
import BookingPage from "./pages/BookingPage/BookingPage";
import Header from "./Partials/Header/Header";
import Footer from "./Partials/Footer/Footer";
import Box from "@mui/material/Box";
import LeftMenu from "./Partials/LeftMenu/LeftMenu";
import AdvisorPreview from "./pages/Advisor-Overview/AdvisorOverview";
import PasswordReset from "./pages/LogingPage/Partials/PasswordReset";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import ResumeCreation from "./pages/ResumeCreation/ResumeCreation";
import Cookies from 'js-cookie';
import ChatBot from "./pages/chatBot/chatBot";
import AppointmentManagement from "./pages/AppoinmentManage/AppoinmentManage";
import CVManagement from "./pages/cvGrade/CVGrade";
import WorkshopManagement from "./pages/WorkshopManagement/WorkshopManagement";
import CVReviewRequest from "./pages/SendCVRevReq/SendCVRevReq";
import UserInfo from "./pages/UserInfo/UserInfo";

const App: React.FC = () => {
  const location = useLocation();

  const showLayout = !["/login", "/SignUp", "/passwordReset", "/admin-login"].includes(
    location.pathname
  );

  const studentToken = Cookies.get('studentToken');

  return (
    <Box display="flex">
      {showLayout && <LeftMenu />}
      <Box flex="1">
        {showLayout && <Header />}
        <Box className="body">
          <Routes>
          <Route path="/profile" element={studentToken ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="/resume-creation" element={studentToken ? <ResumeCreation /> : <Navigate to="/login" />} />
            <Route path="/CVReviewRequest" element={<CVReviewRequest />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/passwordReset" element={<PasswordReset />} />
            <Route path="/userDashboard" element={studentToken ? <UserDashboard /> : <Navigate to="/login" />} />
            <Route path="/aiChatBot" element={<ChatBot />} />
            <Route path="/booking" element={studentToken ? <BookingPage /> : <Navigate to="/login" />} />

            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/advisor/advisorOveview" element={<AdvisorPreview />} />
            <Route path="/advisorOveview" element={<AdvisorPreview />} />
            <Route path="/advisor/appointmentManagement" element={<AppointmentManagement />} />
            <Route path="/advisor/WorkshopManagement" element={<WorkshopManagement />} />
            <Route path="/advisor/CVManagement" element={<CVManagement />} />
            <Route path="/advisor/UserInfo" element={<UserInfo />} />

          </Routes>
        </Box>
        {showLayout && <Footer />}
      </Box>
    </Box>
  );
};

export default App;