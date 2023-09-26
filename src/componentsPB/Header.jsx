import React from "react";
import {
  AppBar,
  Toolbar,
  Button,

} from "@mui/material"; // Import Material-UI components

import "../assets/public.css";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleFAQVisibility }) => {

  const navigate = useNavigate();
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

  onClick={e=>{
    e.preventDefault()
    navigate("/Login")

  }}
>
  LOGIN
</Button>

        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
