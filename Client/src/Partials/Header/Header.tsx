import React, { useState, useEffect } from "react";
import "./Header.css"; // Import CSS styles
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../image/cgplogo.png";
import Cookies from 'js-cookie';
import axios from 'axios';

const Header: React.FC = () => {
  const [profileName, setProfileName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const fetchedLoggedUser = async () => {
    const userRole = Cookies.get("userType");
    if (userRole === "Student") {
      try {
        const response = await axios.get("http://localhost:8070/api/user/wami", {
          headers: {
            Authorization: `Bearer ${Cookies.get('studentToken')}`
          }
        });
        const firstName = response.data.user.firstName;
        const lastName = response.data.user.lastName;
        setProfileName(`${firstName} ${lastName}`);
        setAvatar(`${firstName.charAt(0)}${lastName.charAt(0)}`);
      } catch (error:any) {
        if (error.response) {
          console.log(error.response.data);
        }
      }
    } else if (userRole === "Advisor") {
      // Handle Advisor role
    }
  };

  useEffect(() => {
    fetchedLoggedUser();
  }, []);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    logout();
    handleMenuClose();
  };

  const logout = () => {
    Cookies.remove('advisorToken');
    Cookies.remove('studentToken');
    Cookies.remove('userType');
    navigate('/login');
  };

  return (
    <AppBar position="static" className="header-appbar" color="transparent">
      <Toolbar className="header-toolbar">
        <img src={logo} className="cgp-logo" alt="logo" />
        <Box className="header-right">
          <Avatar className="header-avatar" onClick={handleAvatarClick}>{avatar}</Avatar>
          <Typography variant="body2" className="header-profile-name">
            {profileName}
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;