import React from "react";
import "../../App.css"; // Create a separate CSS file for styling
import { AppBar, Toolbar } from "@mui/material"; // Import Material-UI components

const Header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#f8f8f8" }}>
      <Toolbar style={{ display: "flex", justifyContent: "center" }}>
        <img className="logo" src="wellness-logov2.png" alt="Wellness Logo" />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
