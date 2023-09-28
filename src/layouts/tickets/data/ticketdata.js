
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
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { IconButton, Tooltip } from "@mui/material";

import { GRANTED_FROM_PENDING , DELETE_TICKET_SUBMIT} from '../../../firebase/Database'


// set status color
const statusColor = (stats) =>{
  if (stats === "done"){
    return "success"
  }else if(stats === "processing "){
    return "light"
  }else if (stats === "pending"){
    return "dark"
  }else{
    return "error"
  }
}

// Action components
const ActionComponents = (data) => {
  return(
  
  <div>
    {/* data.status !== "done" ? 
      <div key={data.key}>
      
        {/* Approved */}
          <Tooltip title="Granted" arrow>

              <IconButton aria-label="delete" 
              onClick={e=>{
                e.preventDefault()
                // pendingToGranted(user.Email,user.Password,user.id)
                GRANTED_FROM_PENDING(data.id)
                .then(e=>{
                  console.log(e) 
                  window.location.reload()
                })
              }}
              color="success">

                <CheckCircleOutlineOutlinedIcon  />

              </IconButton>
            </Tooltip>
              
              {/* Delete */}
              <Tooltip title="Delete" arrow>
                <IconButton aria-label="delete" onClick={e=>{
      
                  e.preventDefault()
                  DELETE_TICKET_SUBMIT(data.id)
                  
                  }} color="error">
                  <DeleteOutlineOutlinedIcon  />
                </IconButton>
              </Tooltip>
      
              </div>
              :           
    
              <Tooltip title="Delete" arrow>
                <IconButton aria-label="delete" onClick={e=>{
      
                  e.preventDefault()
                  // DELETE_TICKET_SUBMIT(data.id)
                  
                  }} color="error">
                  <EditOutlinedIcon  />
                </IconButton>
              </Tooltip>
              */}
  </div>)
}

export default function data(rowss) {


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
          color={statusColor(data.status)} 
          // color="light"
          variant="gradient" size="sm" />

        </MDBox>
      ),

      email: (
        <MDTypography key={key} component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {data.email}
        </MDTypography>
      ),
            // action
      action: ( <ActionComponents/> )
    })),
  };
}

