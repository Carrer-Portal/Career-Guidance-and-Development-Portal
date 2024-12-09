import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProfilePage from "./pages/UserProfile/userprofile";
import Login from "./pages/LogingPage/LoginPage";
import SignUp from "./pages/SignUp/signup";
import "./main.css";
import Home from "./pages/Home/home";
import BookingPage from "./pages/BookingPage/BookingPage";
import Header from "./Partials/Header/Header";
import Footer from "./Partials/Footer/Footer";
import Box from "@mui/material/Box";
import LeftMenu from "./Partials/LeftMenu/LeftMenu";
import AdvisorPreview from "./pages/Advisor-Overview/AdvisorPverview";

const App: React.FC = () => {
  const location = useLocation();

  const showLayout = ["/", "/profile"].includes(location.pathname);

  return (
    <Box display="flex">
      {showLayout && <LeftMenu />}
      <Box flex="1">
        {showLayout && <Header />}
        <Box className="body">
          <Routes>
            <Route path="/" element={<AdvisorPreview />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Box>
        {showLayout && <Footer />}
      </Box>
    </Box>
  );
};

export default App;
