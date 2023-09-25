// import { Link } from "react-router-dom";
import React from "react";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

// Validation and Signup
import { SignUp_userSchema } from '../Validation/Validation'
import { createAccount } from '../../../firebase/Authentication'


function Cover() {

  // User det
  const [users,setUsers] = React.useState({
    Name:"",
    Email: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [error, setError] = React.useState({
    name: false,
    nameError: "",

    email: false,
    emailError: "",

    newPassword: false,
    newPasswordError: "",

    confirmPassword: false,
    confirmPasswordError: ""
  })

  const handleOnChange_Name = (event) =>{
    setUsers({...users, Name: event.target.value})
  } 

  const handleOnChange_Email = (event) =>{
    setUsers({...users, Email: event.target.value})
  } 

  const handleOnChange_newPassword = (event) =>{
    setUsers({...users, newPassword: event.target.value})
  } 

  const handleOnChange_confirmPassword = (event) =>{
    setUsers({...users, confirmPassword: event.target.value})
  } 

  const handleOnClick = async () =>{

    try {
      await SignUp_userSchema.validate({ 
        name: users.Name,
        email: users.Email, 
        password: users.newPassword,
        confirmPassword: users.confirmPassword
      }, { abortEarly: false });
      
      createAccount(users.Name,users.Email,users.newPassword)


    } catch (validationError) {

      // Extract specific error messages for email and password
      const nameError = validationError.inner.find((error) => error.path === 'name');
      const emailError = validationError.inner.find((error) => error.path === 'email');
      const passwordError = validationError.inner.find((error) => error.path === 'password');
      const confirmPasswordError = validationError.inner.find((error) => error.path === 'confirmPassword');

      setError({

        name: !!nameError,
        nameError: nameError && nameError.message,

        email: !!emailError,
        emailError: emailError && emailError.message,

        newPassword: !!passwordError,
        newPasswordError: passwordError && passwordError.message,
    
        confirmPassword: !!confirmPasswordError,
        confirmPasswordError: confirmPasswordError && confirmPasswordError.message
      });
      
    }

  }
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">

            {/* Name */}
            <MDBox mb={2}>
              <MDInput 
              type="text" 
              label="Name" 
              variant="standard" 
              fullWidth 
              onChange={handleOnChange_Name}

              error={error.name}
              helperText={error.nameError}
              />
            </MDBox>

            {/* Email */}
            <MDBox mb={2}>
              <MDInput  type="email" label="Email" variant="standard" fullWidth 
              onChange={handleOnChange_Email}
              
              error={error.email}
              helperText={error.emailError}
              />
            </MDBox>

            {/* New Password */}
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth 
              onChange={handleOnChange_newPassword}

              error={error.newPassword}
              helperText={error.newPasswordError}
              />
            </MDBox>

            {/* Confirm Password */}
            <MDBox mb={2}>
              <MDInput type="password" label="Confirm Password" variant="standard" fullWidth 
              onChange={handleOnChange_confirmPassword} 

              error={error.confirmPassword}
              helperText={error.confirmPasswordError}
              />
            </MDBox>

            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>

            {/* Sign Up Accound */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth
              onClick={e=>{
                e.preventDefault();
                handleOnClick()
              }}
              >
                sign in
              </MDButton>
            </MDBox>

            <MDBox mt={3} mb={1} textAlign="center">
              {/* <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography> */}
            </MDBox>


          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
