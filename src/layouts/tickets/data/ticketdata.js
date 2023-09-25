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
// import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { IconButton, Tooltip } from "@mui/material";

export default function data(rowss) {
  // const User = ({ image, name, email }) => (
  //   <MDBox display="flex" alignItems="center" lineHeight={1}>
  //     <MDAvatar src={image} name={name} size="sm" />
  //     <MDBox ml={2} lineHeight={1}>
  //       <MDTypography display="block" variant="button" fontWeight="medium">
  //         {name}
  //       </MDTypography>
  //       <MDTypography variant="caption">{email}</MDTypography>
  //     </MDBox>
  //   </MDBox>
  // );

  // const Institution = ({ title, description }) => (
  //   <MDBox lineHeight={1} textAlign="left">
  //     <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
  //       {title}
  //     </MDTypography>
  //     <MDTypography variant="caption">{description}</MDTypography>
  //   </MDBox>
  // );

  return {
    columns: [
      { Header: "Full Name", accessor: "name", width: "45%", align: "left" },
      { Header: "Address", accessor: "address", align: "center" },
      { Header: "Institution", accessor: "institution", align: "left" },
      { Header: "Contact Number", accessor: "contactNumber", align: "center" },
      { Header: "Brand", accessor: "brand", align: "center" },
      { Header: "Model", accessor: "model", align: "center" },
      { Header: "Serial Number", accessor: "serialNumber", align: "center" },
      { Header: "Issue", accessor: "issue", align: "center" },
      { Header: "Schedule", accessor: "schedule", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Email", accessor: "email", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: Object.values(rowss)?.map((data,key)=>({
      name: data.name,
      address: data.address,
      institution: data.institution,
      contactNumber: data.contactNumber,
      brand: data.brand,
      model: data.model,
      serialNumber: data.serialNumber,
      issue: data.issue,
      schedule: data.schedule,

      // status
      status: (
        <MDBox ml={-1} key={key}>

          <MDBadge 
          badgeContent={data.status} 
          color={data.status==="pending" ?"dark" : "success"} 
          variant="gradient" size="sm" />

        </MDBox>
      ),

      email: (
        <MDTypography key={key} component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {data.email}
        </MDTypography>
      ),
            // action
      action: (
        data.status !== "granted" &&
              <div key={key}>
      
              {/* Approved */}
              <Tooltip title="Granted" arrow>
                <IconButton aria-label="delete" 
                onClick={e=>{
                  e.preventDefault()
                  // pendingToGranted(user.Email,user.Password,user.id)
                }
                }
                
                color="success">
                  <CheckCircleOutlineOutlinedIcon  />
                </IconButton>
              </Tooltip>
              
              {/* Delete */}
              <Tooltip title="Delete" arrow>
                <IconButton aria-label="delete" onClick={e=>{
      
                  e.preventDefault()
                  // rejectUser(user.id)
                  
                  }} color="error">
                  <DeleteOutlineOutlinedIcon  />
                </IconButton>
              </Tooltip>
      
              </div>)
    })),
  };
}

