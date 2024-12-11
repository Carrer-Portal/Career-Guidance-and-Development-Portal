import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import WidgetsIcon from "@mui/icons-material/Widgets";
import GroupsIcon from "@mui/icons-material/Groups";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import "./LeftMenu.css";

const menuItems = [
  {
    path: "/userDashboard",
    icon: <WidgetsIcon />,
    label: "Overview",
  },
  {
    path: "/booking",
    icon: <GroupsIcon />,
    label: "Appointment",
  },
  {
    path: "/resume-manage",
    icon: <TextSnippetIcon />,
    label: "Resume Manage",
    subItems: [
      { 
        path: "/resume-creation",
        icon: <EditNoteIcon />, 
        label: "Create CV" 
      },
      { 
        path: "/resume-manage",
        icon: <DesignServicesIcon />, 
        label: "Manage CV" 
      },
    ],
  },
  {
    path: "/aiChatBot",
    icon: <MarkUnreadChatAltIcon />,
    label: "Chat Assistant",
  },
  {
    path: "/profile",
    icon: <Settings />,
    label: "Settings",
  },
];

const LeftMenu: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleToggleCollapse = () => setIsCollapsed((prev) => !prev);

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box className={`left-menu ${isCollapsed ? "collapsed" : ""}`}>
      <List component="nav" sx={{ paddingTop: "50px" }}>
        {menuItems.map((item) => (
          <React.Fragment key={item.label}>
            <ListItem
              onClick={() => {
                if (!item.subItems) {
                  navigate(item.path);
                } else {
                  setOpenSubmenu((prev) => (prev === item.path ? null : item.path));
                }
              }}
              sx={{
                backgroundColor: isActive(item.path) ? "#e9deed" : "inherit",
                cursor: "pointer",
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive(item.path) ? "#673ab7" : "#d2c6e6",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!isCollapsed && (
                <ListItemText
                  primary={item.label}
                  sx={{
                    color: isActive(item.path) ? "#673ab7" : "#FFFFFF",
                  }}
                />
              )}
              {!isCollapsed && item.subItems && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenSubmenu((prev) => (prev === item.path ? null : item.path));
                  }}
                >
                  {openSubmenu === item.path ? <ExpandLess sx={{ color: "#FFFFFF" }}/> : <ExpandMore sx={{ color: "#FFFFFF" }}/>}
                </IconButton>
              )}
            </ListItem>
            {item.subItems && (
              <Collapse
                in={openSubmenu === item.path}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItem
                      key={subItem.label}
                      onClick={() => navigate(subItem.path)}
                      sx={{ paddingLeft: "32px", cursor: "pointer" }}
                    >
                      <ListItemIcon sx={{ color: "#d2c6e6" }}>
                        {subItem.icon}
                      </ListItemIcon>
                      {!isCollapsed && <ListItemText primary={subItem.label} />}
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>

      <Box className="collapse-btn">
        <IconButton onClick={handleToggleCollapse} color="secondary">
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default LeftMenu;