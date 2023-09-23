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

// @mui material components
import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// import ProfilesList from "examples/Lists/ProfilesList";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
// import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
// import profilesListData from "layouts/profile/data/profilesListData";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Images
// import homeDecor1 from "assets/images/home-decor-1.jpg";
// import homeDecor2 from "assets/images/home-decor-2.jpg";
// import homeDecor3 from "assets/images/home-decor-3.jpg";
// import homeDecor4 from "assets/images/home-decor-4.jpeg";
// import team1 from "assets/images/team-1.jpg";
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";

// ... (your existing imports and code)

// firebase
import { 
  getUserDetails,
  updateUserDetails,
  updatePassword
} from '../../firebase/Authentication'
import React from "react";

import { passwordUpdates } from '../authentication/Validation/Validation'

function Overview() {

  // const inputStyle = {
  //   width: "100%",
  //   padding: "12px", // Increase padding for a larger input
  //   fontSize: "16px", // Increase font size
  //   fontFamily: "Segoe UI, sans-serif", // Use Segoe UI font
  //   border: "1px solid #ccc", // Add a border for clarity
  //   borderRadius: "4px", // Add rounded corners
  //   boxSizing: "border-box", // Include padding and border in width
  // };

  // User profile settings
  const [userProfile, setUserProfile] = React.useState(
    {
      email: "",
      name: ""
    }
  )

    // Login Details
  const email = (e) => {
    setUserProfile({...userProfile, email: e.target.value})
   }

  const name = (e) => {
    setUserProfile({...userProfile, name: e.target.value})
  }

  React.useEffect(()=>{

    getUserDetails()
    .then(e=>setUserProfile(
      {
        email: e.email,
        name: e.name
      }
    ))

  },[])

    // User profile settings
  const [userCredentials, setCredentials] = React.useState(
    {
      oldPassword: "",
      newPassword: ""
    }
   )

  const oldPassword = (e) => {
    setCredentials({...userCredentials, oldPassword: e.target.value})
   }

  const newPassword = (e) => {
    setCredentials({...userCredentials, newPassword: e.target.value})
  }

  // User Update password
  const changePassword = async () =>{

    try {
     
      await passwordUpdates.validate({ oldPassword: userCredentials.oldPassword, newPassword: userCredentials.newPassword }, { abortEarly: false });
      
      console.log(userCredentials)
      updatePassword(userCredentials.oldPassword, userCredentials.newPassword)
      .then(e=>console.log(e))
      .catch(err=>console.log(err))

    } catch (validationError) {

      // Extract specific error messages for email and password
      const emailError = validationError.inner.find((error) => error.path === 'oldPassword');
      const passwordError = validationError.inner.find((error) => error.path === 'newPassword');

      alert(emailError && emailError.message)
      alert(passwordError && passwordError.message)

      

    } 
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header> <br/>


        {/* Input Boxes */}
        <Grid container spacing={2}>
      
          <Grid item xs={12} sm={6}>

            <Grid container spacing={2}>

              <Grid item xs={12} sm={12}>
                {/* Name */}
                <MDInput 
                type="text" 
                label="Name" 
                fullWidth
                value={userProfile.name}
                onChange={name}
                />

              </Grid>

              <Grid item xs={12} sm={12}>

                {/* email */}
                <MDInput 
                type="email" 
                label="Email" 
                fullWidth
                value={userProfile.email}
                onChange={email}
                />

              </Grid>
            </Grid>

          </Grid>

       
          <Grid item xs={12} sm={6}>

            <Grid container spacing={2}>

              {/* Old Password */}
              <Grid item xs={12} sm={12}>
                <MDInput 
                type="text" 
                label="Old Password" 
                fullWidth
                value={userCredentials.oldPassword}
                onChange={oldPassword}
                />
              </Grid>

              {/* new Password */}
              <Grid item xs={12} sm={12}>
                <MDInput 
                type="text" 
                label="New Password" 
                fullWidth
                value={userCredentials.newPassword}
                onChange={newPassword}
                />
              </Grid>

            </Grid>
          </Grid>
        
        </Grid>
        
        {/* Buttons */}
        <MDBox mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>

            {/* Update Info */}
              <MDButton variant="contained" color="primary"
              onClick={e=>{
                e.preventDefault()
                updateUserDetails(userProfile.name,userProfile.email)
              }}
              >
                Update Info
              </MDButton>
            </Grid>
            <Grid item xs={12} sm={6}>

            {/* Change Password */}
              <MDButton variant="contained" color="secondary"
              onClick={e=>{
                e.preventDefault()
                changePassword()
              }}
              >
                Change Password
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
