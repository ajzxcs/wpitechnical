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
import { userSchema } from '../Validation/Validation'
import { LoginSession } from '../../../firebase/Authentication'
import { IconButton, InputAdornment } from "@mui/material";

function Basic() {

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

  // handle on clicl
  const handleOnClick = async (e)=>{

    try {
      await userSchema.validate({ email: users.Email, password: users.Password }, { abortEarly: false });
      

      LoginSession(users).then(result=>{
          console.log(result)

          if (result){
            setError({
              email: false,
              emailError: "",
  
              password: false,
              passwordError: ""
            });
  
            window.location.reload()
          }else{
            setError({
              email: true,
              emailError: "",
  
              password: true,
              passwordError: "you are not a admin"
            });
  
          }
          
        

      }).catch((error) => {
        console.log("error",error); // Error message

          setError({
            email: true,
            emailError: "",

            password: true,
            passwordError: error
          });

      });


    } catch (validationError) {

      // Extract specific error messages for email and password
      const emailError = validationError.inner.find((error) => error.path === 'email');
      const passwordError = validationError.inner.find((error) => error.path === 'password');

      // If validation errors occur
      setError({
        email: !!emailError,
        emailError: emailError && emailError.message,

        password: !!passwordError,
        passwordError: passwordError && passwordError.message
      });
      
    }

  }
  return (
    <BasicLayout image={bgImage}>
      <Card>

      {/*  */}
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Wellness Pro 
          </MDTypography>


          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>

            {/* Facebook */}
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="/" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>

          

          </Grid>
        </MDBox>

        {/* User Logins */}
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">

          {/* Email */}
            <MDBox mb={2}>
              <MDInput 
              type="email" 
              label="Email" 
              fullWidth
              onChange={handleOnChange_Email}
              value={users.Email}
              helperText={error.emailError}
              error={error.email}
              />
            </MDBox>

            {/* Password */}
            <MDBox mb={2}>
              <MDInput 
              type={showPasswordCheckbox ? "text" : "password"}

              InputProps={{
                        endAdornment: 
                        <InputAdornment disableTypography position="end">
                            <IconButton
                            color="inherit"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end">
                                {showPasswordCheckbox ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small"  />}
                            </IconButton>
                        </InputAdornment>
                    }}
              label="Password" 
          
              fullWidth 
              onChange={handleOnChange_Password}
              value={users.Password}
              helperText={error.passwordError}
              error={error.password}
              />
            </MDBox>

            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}

            <MDBox mt={4} mb={1}>
              <MDButton 
              variant="gradient" 
              color="info" 
              fullWidth 
              onClick={handleOnClick}>
                sign in
              </MDButton>
            </MDBox>


            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}



          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
