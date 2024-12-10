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
import AdvisorPreview from "./pages/Advisor-Overview/AdvisorPverview";
import PasswordReset from "./pages/LogingPage/Partials/PasswordReset";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import ResumeCreation from "./pages/ResumeCreation/ResumeCreation";
import Cookies from 'js-cookie';

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
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/passwordReset" element={<PasswordReset />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/advisorOveview" element={<AdvisorPreview />} />

            {/* Private Routes */}
            <Route path="/booking" element={studentToken ? <BookingPage /> : <Navigate to="/login" />} />
            <Route path="/profile" element={studentToken ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="/userDashboard" element={studentToken ? <UserDashboard /> : <Navigate to="/login" />} />
            <Route path="/resume-creation" element={studentToken ? <ResumeCreation /> : <Navigate to="/login" />} />
          </Routes>
        </Box>
        {showLayout && <Footer />}
      </Box>
    </Box>
  );
};

export default App;