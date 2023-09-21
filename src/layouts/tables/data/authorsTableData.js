/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import pending from "assets/images/pending.png";
import Users from "assets/images/user.png";
import React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";

// firebase
import { pendingToGranted } from '../../../firebase/Database'

// dummy darta
import jsonData from './dumm.json';



export default function data(rowrow) {
  const User = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Institution = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    console.log(event.currentTarget)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return {

      
    columns: [
      { Header: "User", accessor: "user", width: "45%", align: "left" },
      { Header: "Number", accessor: "number", align: "center" },
      { Header: "Organization", accessor: "organization", align: "center" },
      { Header: "Device", accessor: "device", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Date", accessor: "date", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: Object.values(jsonData)?.map((user, index) => ({
      
      // Email and Fullname
      user: (
        <User key={index} image={user.Status === "Granted" ? Users : pending} name={user.Fullname} email={user.Email} />
      ),

      // Number
      number: (
        <MDTypography
        key={index}
        component="a"
        href="#"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {user.Number}
      </MDTypography>
      ),

      // Organization
      organization: (
        <Institution key={index} title={user.Organization} description="" />
      ),

      // device
      device: (
        <MDTypography
          key={index}
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {user.Device}
        </MDTypography>
      ),

      // status
      status: (
        <MDBox key={index} ml={-1}>
          <MDBadge badgeContent={user.Status} color={user.Status === "Granted" ? "success" : "dark"} variant="gradient" size="sm" />
        </MDBox>
      ),

      // date
      date: (
        <MDTypography
          key={index}
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {user.date[0]}
        </MDTypography>
      ),

      // action
      action: (

        <div key={index}>
          {
            user.Status === "Granted" ?     
        <MDTypography
          key={index}
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          <DeleteOutlineOutlinedIcon fontSize="medium" />
        </MDTypography>
        
        :         
        <MDTypography
          key={index}
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          onClick={handleClick}
        >
          <EditOutlinedIcon fontSize="medium" />
        </MDTypography>
          }

          <Menu
        id="basic-menu"
        // anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
        </div>


    
      )
      
    })
    )

  };
}


