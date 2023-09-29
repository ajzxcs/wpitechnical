
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

    rows: Object.values(rowss)?.map((data, key) => ({
      name: data.name,
      address: data.address,
      institution: data.institution,
      contactNumber: data.contactNumber,
      brand: data.brand,
      model: data.model,
      serialNumber: data.serialNumber,
      issue: data.issue,
      schedule: data.schedule,
      status: (
        <MDBox ml={-1} key={key}>
          <MDBadge
            badgeContent={data.status}
            variant="gradient"
            color={statusColor(data.status)}
            size="sm"
          />
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
          
             <TextField
                label={field.label}
                name={field.name}
                value={editFormData[field.name] || ""}
                onChange={handleEditFormChange}
                fullWidth
              
              />
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

