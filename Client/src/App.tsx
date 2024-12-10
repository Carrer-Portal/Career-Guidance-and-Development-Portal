import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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

const App: React.FC = () => {
  const location = useLocation();

  const showLayout = !["/login", "/SignUp", "/passwordReset","/admin-login"].includes(
    location.pathname
  );

  return (
    <Box display="flex">
      {showLayout && <LeftMenu />}
      <Box flex="1">
        {showLayout && <Header />}
        <Box className="body">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/passwordReset" element={<PasswordReset />} />
            <Route path="/userDashboard" element={<UserDashboard />} />

            {/* Advisor Views */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/advisorOveview" element={<AdvisorPreview />} />
          </Routes>
        </Box>
        {showLayout && <Footer />}
      </Box>
    </Box>
  );
};

export default App;
