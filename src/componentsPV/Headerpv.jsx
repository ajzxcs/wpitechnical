import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem
} from "@mui/material"; // Import Material-UI components
import SettingsIcon from "@mui/icons-material/Settings"; // Import the Settings icon
import HelpIcon from "@mui/icons-material/Help"; // Import the Help icon
import "../assets/public.css";
 
import { LogoutSession } from "../Features/Authentication/Authentication"

const Header = ({ toggleFAQVisibility, onGoBack }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

  };

  const handleCloseLogout = () => {
    setAnchorEl(null);
    LogoutSession()
  };


  return (
    <AppBar position="static" style={{ backgroundColor: "#93b4d3" }}>
      <Toolbar className="toolbar">
        <div className="logo-container">
          <img className="logo" src="WPI 1.png" alt="Wellness Logo" />
        </div>
        <div className="button-container">
          {/* FAQ icon button */}

          <Tooltip title="FAQ">
            <IconButton
              className="HelpIcon"
              color="inherit"
              onClick={toggleFAQVisibility}
              aria-controls="settings-menu"
              aria-haspopup="true"
            >
              <HelpIcon style={{fontSize: '200%'}}/>
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton
              color="inherit"
              onClick={handleSettingsClick}
              aria-controls="settings-menu"
              aria-haspopup="true"
            >
              <SettingsIcon style={{fontSize: '200%'}}/>
            </IconButton>
          </Tooltip>
          <Menu
            id="settings-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleCloseLogout}>Logout</MenuItem>
            {/* <MenuItem onClick={handleClose}>Change Password</MenuItem> */}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
