import React from "react";

// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// validation & firebase
import { LoginSession } from "../../firebase/Authentication"
import { IconButton, InputAdornment } from "@mui/material";

import Private from "./ForumAdmin"

import Basoc from "./componentsAdmin/Basoc"

function AdminForum() {

  const [showPasswordCheckbox, setShowPasswordCheckbox] = React.useState(false);

  const handleClickShowPassword = () => setShowPasswordCheckbox(!showPasswordCheckbox);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
};

  const [users,setUsers] = React.useState({
    Email: "",
    Password: ""
  })

  const [error, setError] = React.useState({
    email: false,
    emailError: "",
    password: false,
    passwordError: ""
  })

  const handleOnChange_Email = (event) =>{
    setUsers({...users, Email: event.target.value})
  } 

  const handleOnChange_Password = (event) =>{
    setUsers({...users, Password: event.target.value})
  }


  return (
    <div>
      <Basoc>
        <Private/>
    </Basoc>
    </div>
  );
}

export default AdminForum;
