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
            <span className="menu-icon">🏠</span>
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Overview" />}
        </ListItem>

        <ListItem onClick={() => setOpenDevelop(!openDevelop)}>
          <ListItemIcon>
            <span className="menu-icon">🛠️</span>
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Develop" />}
          {!isCollapsed && (openDevelop ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        <Collapse in={openDevelop} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className="nested">
              <ListItemIcon>
                <span className="menu-icon">⚙️</span>
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="API Proxy" />}
            </ListItem>
            <ListItem className="nested">
              <ListItemIcon>
                <span className="menu-icon">📄</span>
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Documents" />}
            </ListItem>
          </List>
        </Collapse>

        <ListItem onClick={() => setOpenDeploy(!openDeploy)}>
          <ListItemIcon>
            <span className="menu-icon">🚀</span>
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Deploy" />}
          {!isCollapsed && (openDeploy ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        <Collapse in={openDeploy} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className="nested">
              <ListItemIcon>
                <span className="menu-icon">🌍</span>
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Environments" />}
            </ListItem>
            <ListItem className="nested">
              <ListItemIcon>
                <span className="menu-icon">🔧</span>
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="ENV Configs" />}
            </ListItem>
          </List>
        </Collapse>

        <ListItem>
          <ListItemIcon>
            <span className="menu-icon">⚗️</span>
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Test" />}
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Settings />
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
