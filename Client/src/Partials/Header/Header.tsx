import React from "react";
import "./Header.css"; // Import CSS styles
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import logo from "../../image/cgplogo.png";

const Header: React.FC = () => {
  return (
    <AppBar position="static" className="header-appbar" color="transparent">
      <Toolbar className="header-toolbar">
        <img src={logo} className="cgp-logo" alt="logo" />
        <Box className="header-right">
          <Avatar className="header-avatar">NP</Avatar>
          <Typography variant="body2" className="header-profile-name">
            Nimal Perera
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
