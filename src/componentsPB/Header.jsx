import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Menu,
  MenuItem
} from "@mui/material"; // Import Material-UI components
import SettingsIcon from "@mui/icons-material/Settings"; // Import the Settings icon
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"; // Import the QuestionAnswer icon
import HelpIcon from "@mui/icons-material/Help"; // Import the Help icon
import "../assets/public.css";

const Header = ({ toggleFAQVisibility, onGoBack }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#93b4d3" }}>
      <Toolbar className="toolbar">
        <div className="logo-container">
          <img className="logo" src="WPI 1.png" alt="Wellness Logo" />
        </div>
        <div className="button-container">
          {/* FAQ icon button */}
         
  <Button
    className="question"
    color="inherit"
    onClick={toggleFAQVisibility}
    aria-controls="settings-menu"
    aria-haspopup="true"
    style={{
      height: '30px',          // Adjust the height as needed
      '&:hover': {
       Color: '#000000', // Change the background color on hover
      },
      color : 'white',
      fontSize:'13px'
  
    }}
  >
   FAQ
  </Button>

         {/* <Tooltip title="Settings">
            <IconButton
              color="inherit"
              onClick={handleSettingsClick}
              aria-controls="settings-menu"
              aria-haspopup="true"
             
            >
              <SettingsIcon />
            </IconButton>
  </Tooltip>*/}

<Button
  style={{
    height: '30px',          // Adjust the height as needed
    backgroundColor: '#3399cc', // Change the background color
    '&:hover': {
      backgroundColor: 'red', // Change the background color on hover
    },
    color : 'white',
    marginLeft :'10px'
  }}
>
  LOGIN
</Button>



          <Menu
            id="settings-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            <MenuItem onClick={handleClose}>Change Password</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
