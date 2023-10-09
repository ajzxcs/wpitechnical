
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
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import React, { useState } from "react";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";

import { GRANTED_FROM_PENDING,UPDATE_DATA } from '../../../firebase/Database'

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
   {data?.status === 'pending' && (
        <>
        {/* Process */}
          <Tooltip key={data.id} title="Process" arrow>
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
          <Tooltip  key={data.id} title="Done" arrow>
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
      {data?.status === 'process' && (

        
        <Tooltip key={data.id} title="Done" arrow>
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
const fieldConfigurations = [
  { label: "Name", name: "name" },
  { label: "Address", name: "address" },
  { label: "Institution", name: "institution" },
  { label: "Contact Number", name: "contactNumber" },
  { label: "Brand", name: "brand" },
  { label: "Model", name: "model" },
  { label: "Serial Number", name: "serialNumber" },
  { label: "Issue", name: "issue" },
  { label: "Schedule", name: "schedule" },
  { label: "Type of Request", name: "typeRequest", type: "select", options: ["Corrective Maintenance/Repair (default)", "Preventive Maintenance", "Delivery/Installation", "Inquiry/SCE", "Internal Request"] }
];

export default function Data(rowss) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    address: "",
    institution: "",
    contactNumber: "",
    brand: "",
    model: "",
    serialNumber: "",
    issue: "",
    schedule: "",
    typeRequest: "",
  });

  
  const handleOpenEditModal = (data) => {
    setOpenEditModal(true);

    // console.log(data)

    setEditFormData(data);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditFormSubmit = e => {
    e.preventDefault()
    // console.log("Edited data:", editFormData);
    UPDATE_DATA(editFormData)
    .then(result=>{
      alert(result);
      window.location.reload();
    })
    .catch(error=>alert(error))
    handleCloseEditModal();
  };

  const handleOnEdit = (data) => {
    handleOpenEditModal(data);
  };

  // set status color
  const StatusColor = (stats) =>{
      switch (stats) {
        case "done":
          return "#4CAF50";
        case "process":
          return "#FB8C00";
        case "pending":
          return "#F65F53";
        default:
          // Handle the case when the status doesn't match any of the expected values.
          // You can return a default color or throw an error, depending on your requirements.
          return "defaultColor"; // Change this to your desired default color.
      }
  }
  

  return {
    columns: [
      { Header: "Request ID", accessor: "requestID", width: "45%", align: "left" },
      { Header: "Full Name", accessor: "name",align: "center" },
      { Header: "Address", accessor: "address", align: "center" },
      { Header: "Institution", accessor: "institution", align: "left" },
      { Header: "Designation", accessor: "designation", align: "center" },
      { Header: "Type of Request", accessor: "typeRequest", align: "center" },
      { Header: "Warranty Status", accessor: "warrantyStatus", align: "center" },
      { Header: "Brand", accessor: "brand", align: "center" },
      { Header: "Model", accessor: "model", align: "center" },
      { Header: "Serial Number", accessor: "serialNumber", align: "center" },
      { Header: "Issue", accessor: "issue", align: "center" },
      { Header: "Date Requested", accessor: "dateRequested", align: "center" },
      { Header: "Schedule", accessor: "schedule", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Email", accessor: "email", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
      { Header: "Edit", accessor: "edit", align: "center" },
    ],

    rows: Object.values(rowss)?.map((data, key) => ({
      requestID: data.tickeid,
      name: data.name,
      address: data.address,
      institution: data.institution,
      contactNumber: data.contactNumber,
      designation: data.designation,
      typeRequest: data.typeOfRequest,
      warrantyStatus: data.warrantyStatus,
      brand: data.brand,
      model: data.model,
      serialNumber: data.serialNumber,
      issue: data.issue, 
      dateRequested: data.dateRequested,
      schedule: data.schedule,
      status: (
        <MDBox ml={-1} key={key}>

          <MDBadge 

          badgeContent={data.status} 
          variant="gradient"
          color={StatusColor(data.status)} 
          size="sm" />
  

        </MDBox>
      ),
      email: (
        <MDTypography
          key={key}
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {data.email}
        </MDTypography>
      ),
      action: <ActionComponents status={data.status} id={data.id} />,
      edit: (
        <div key={key}>
      {/* Edit button */}
      <Tooltip title="Edit" arrow>
        <IconButton
          aria-label="Edit"
          onClick={() => handleOnEdit(data)}
          color="default"
        >
          <EditOutlinedIcon />
        </IconButton>
      </Tooltip>

      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal} 
      maxWidth="md"
        fullWidth >
        <DialogTitle>Edit Data</DialogTitle>
        <br/>
        <DialogContent>
        
        {fieldConfigurations.map((field, index) => (
    <Box mb={2} key={index}>
      {field.type === "select" ? (
        <FormControl fullWidth>
          <InputLabel>{field.label}</InputLabel>
          <Select
            name={field.name}
            value={editFormData[field.name] || ""}
            onChange={handleEditFormChange}
          >
            {field.options.map((option, optionIndex) => (
              <MenuItem key={optionIndex} value={option}>
                {option}
              </MenuItem>


            ))}
      
          </Select>

        </FormControl>
      
      ) : (
        <TextField
          label={field.label}
          name={field.name}
          value={editFormData[field.name] || ""}
          onChange={handleEditFormChange}
          fullWidth
        />
      )}
    </Box>
          ))}
  
        </DialogContent>
       
        <DialogActions>
            {/* Cancel */}
            <Button onClick={handleCloseEditModal}>Cancel</Button>

            {/* Save */}
            <Button onClick={handleEditFormSubmit} color="primary">
            Save
           </Button>
        </DialogActions>
      </Dialog>
    </div>
      ),
    })),
  };
}

