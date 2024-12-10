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
import "./LeftMenu.css";
import WidgetsIcon from "@mui/icons-material/Widgets";
import GroupsIcon from "@mui/icons-material/Groups";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";

const LeftMenu: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [openDevelop, setOpenDevelop] = useState(false);
  const [openDeploy, setOpenDeploy] = useState(false);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <Box className={`left-menu ${isCollapsed ? "collapsed" : ""}`}>
      <List component="nav" sx={{ paddingTop: "50px" }}>
        <ListItem>
          <ListItemIcon>
            <ListItemIcon>
              <WidgetsIcon sx={{ color: "#d2c6e6" }} />
            </ListItemIcon>
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Overview" />}
        </ListItem>

        <ListItem onClick={() => setOpenDevelop(!openDevelop)}>
          <ListItemIcon>
            <GroupsIcon sx={{ color: "#d2c6e6" }} />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Appointment" />}
        </ListItem>
        <ListItem onClick={() => setOpenDeploy(!openDeploy)}>
          <ListItemIcon>
            <TextSnippetIcon sx={{ color: "#d2c6e6" }} />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Resume Manage" />}
          {!isCollapsed && (openDeploy ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        <Collapse in={openDeploy} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className="nested">
              <ListItemIcon>
                <EditNoteIcon sx={{ color: "#d2c6e6" }} />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Create CV" />}
            </ListItem>
            <ListItem className="nested">
              <ListItemIcon>
                <DesignServicesIcon sx={{ color: "#d2c6e6" }} />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Manage CV" />}
            </ListItem>
          </List>
        </Collapse>

        <ListItem>
          <ListItemIcon>
            <MarkUnreadChatAltIcon sx={{ color: "#d2c6e6" }} />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Chat Assistant" />}
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Settings sx={{ color: "#d2c6e6" }} />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Settings" />}
        </ListItem>
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
