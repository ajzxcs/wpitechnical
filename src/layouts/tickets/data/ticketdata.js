
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";

import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { IconButton, Tooltip } from "@mui/material";

import { GRANTED_FROM_PENDING} from '../../../firebase/Database'


// set status color
const statusColor = (stats) =>{
  if (stats === "done"){
    return "#4CAF50"
  }else if(stats === "process"){
    return "#FB8C00"
  }else if (stats === "pending"){
    return "#F65F53"
  }else{
    return "error"
  }
}

// Action components
const ActionComponents = (data) => {

  const handleDoneClick = (Status) => {

    GRANTED_FROM_PENDING(data.id,Status)
      .then(response => {
        console.log(response);
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return(
  
  <div>
   {data.status === 'pending' && (
        <>
        {/* Process */}
          <Tooltip title="Process" arrow>
            <IconButton
              onClick={e=>{
                e.preventDefault()
                handleDoneClick("process")
              }}
              color="warning"
            >
              <HourglassBottomOutlinedIcon />
            </IconButton>
          </Tooltip>

        {/* Done */}
          <Tooltip title="Done" arrow>
            <IconButton
              aria-label="Done"
              onClick={e=>{
                e.preventDefault()
                handleDoneClick("done")
              }}
              color="success"
            >
              <CheckCircleOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      
      {/* done */}
      {data.status === 'process' && (

        
        <Tooltip title="Done" arrow>
          <IconButton
            aria-label="Done"
            onClick={e=>{
                e.preventDefault()
                handleDoneClick("done")
              }}
            color="success"
          >
            <CheckCircleOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
             
  </div>
  )
}

export default function data(rowss) {

  // HOYYY FRANZ DITO KA MAG CODE
  const handleOnEdit = e => {
    e.preventDefault()
    alert("HOY FRANZ DITO KA MAG CODE!!")
  }

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
      { Header: "Edit", accessor: "edit", align: "center" },
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
          variant="gradient"
          color={statusColor(data.status)} 

          size="sm" />

        </MDBox>
      ),

      email: (
        <MDTypography key={key} component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {data.email}
        </MDTypography>
      ),
      // action
      action: ( <ActionComponents status={data.status} id={data.id}/> ),
      edit: (   
      <Tooltip title="Edit" arrow>
      <IconButton aria-label="delete" onClick={handleOnEdit} color="default">
        <EditOutlinedIcon  />
      </IconButton>
    </Tooltip>  ),
    })),
  };
}

