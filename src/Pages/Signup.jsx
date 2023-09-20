import { 
    Box,
    Button,
    Grid, 
    IconButton, 
    InputAdornment, 
    Stack, 
    TextField 
} from '@mui/material'
import React from 'react'
import styled from 'styled-components';
import LOGO from '../assets/WPI crop.png'

import { signupSchema } from '../Features/Authentication/Validation'
import { addpendingSignup } from '../Features/firebase/Database'

// icons
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'; //name
import CorporateFareIcon from '@mui/icons-material/CorporateFare'; // org or ins
import CallIcon from '@mui/icons-material/Call'; // conatct number
import EmailIcon from '@mui/icons-material/Email'; // email
import LockIcon from '@mui/icons-material/Lock';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  background-image: url("backG.JPG");
  background-size: cover;
  background-color: rgba(255, 255, 255); /* Adjust the opacity as needed */
  z-index: -1;
`;

// 

const Signup = () => {
    // get windows screen
    const [state, setState] = React.useState(false);
    React.useEffect(()=>{
        const setResponsiveness = () => {
            return window.innerWidth < 700 ? setState(true) : setState(false);
        };

        setResponsiveness();
            window.addEventListener("resize", () => setResponsiveness());
        return () => {
            window.removeEventListener("resize", () => setResponsiveness());
        };
    },[])

    const [showPassword, setShowPassword] = React.useState({
        password: false,
        confirmPassword: false
    });

    const handleClickShowPassword = () => setShowPassword({...showPassword, password: !showPassword.password});
    const handleClick_ShowPassword = () => setShowPassword({...showPassword, confirmPassword: !showPassword.confirmPassword});
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // user details and signup
    const [signupDetails, setSignupdetails] = React.useState({
        fullname: "",
        organization: "",
        contactNumber: "",
        email:"",
        password: "",
        confirmPassword: ""
    })

    // for fullname
    const handleforFullname = e =>{
        setSignupdetails({...signupDetails, fullname: e.target.value})
    }

    // for Organzation
    const handleforOrganization = e =>{
        setSignupdetails({...signupDetails, organization: e.target.value})
    }

    // for contact number
    const handleforContactnumber = e =>{
        setSignupdetails({...signupDetails, contactNumber: e.target.value})
    }

    // for email
    const handleforEmail = e =>{
        setSignupdetails({...signupDetails, email: e.target.value})
    }


    // for password
    const handleforPassword = e =>{
        setSignupdetails({...signupDetails, password: e.target.value})
    }

    // for Confirm password
    const handleforConfirmpassword = e =>{
        setSignupdetails({...signupDetails, confirmPassword: e.target.value})
    }

    // Validation and submit and error
    const [signupError, setSignupError] = React.useState({
        fullname: "",
        fullnameError: false,

        organization: "",
        organizationError: false,

        contactNumber: "",
        contactNumberError: false,

        email: "",
        emailError: false,

        password: "",
        passwordError: false,

        confirmPassword: "",
        confirmPasswordError: false
    })

    // submit
    const handleforSubmit = e =>{
        e.preventDefault()

        // VALID    
        isValid(
            signupDetails.fullname,
            signupDetails.organization,
            signupDetails.contactNumber,
            signupDetails.email,
            signupDetails.password,
            signupDetails.confirmPassword,
        )
    }

    // check browser
    const browser = () =>{
        const userAgent = navigator.userAgent;

        const os = /Android/i.test(userAgent)
          ? 'Android'
          : /Windows/i.test(userAgent)
          ? 'Windows'
          : /iPad/i.test(userAgent)
          ? 'iPadOS'
          : /iPhone/i.test(userAgent)
          ? 'iOS'
          : 'Unknown';
          
        const browser = /Chrome/i.test(userAgent)
          ? 'Chrome'
          : /Edge/i.test(userAgent)
          ? 'Edge'
          : /Safari/i.test(userAgent)
          ? 'Safari'
          : 'Unknown';

        return {os,browser}
    }

    const isValid = async (fullname,organization,contactNumber,email,password,confirmPassword) =>{
        try{
            await signupSchema.validate({ 
                fullName: fullname, 
                organization: organization,
                contactNumber: contactNumber,
                email: email,
                password,
                confirmPassword,

            }, { abortEarly: false });

            addpendingSignup(fullname,organization,email,contactNumber,confirmPassword,browser().os, browser().browser)
            .then(e=>{
                alert(e);
                setSignupError({
                    fullname: "",
                    fullnameError: false,
            
                    organization: "",
                    organizationError: false,
            
                    contactNumber: "",
                    contactNumberError: false,
            
                    email: "",
                    emailError: false,
            
                    password: "",
                    passwordError: false,
            
                    confirmPassword: "",
                    confirmPasswordError: false
                })
            })
            .catch(e=>{
                setSignupError({
                    fullname: "",
                    fullnameError: true,
            
                    organization: "",
                    organizationError: true,
            
                    contactNumber: "",
                    contactNumberError: true,
            
                    email: "",
                    emailError: true,
            
                    password: "",
                    passwordError: true,
            
                    confirmPassword: e,
                    confirmPasswordError: true
                })
            })

  

        }catch(validationError){
            
            // Extract specific error messages for email and password
            const fullnameError = validationError.inner.find((error) => error.path === 'fullName');
            const organizationError = validationError.inner.find((error) => error.path === 'organization');
            const contactnumberError = validationError.inner.find((error) => error.path === 'contactNumber');
            const emailError = validationError.inner.find((error) => error.path === 'email');
            const passwordError = validationError.inner.find((error) => error.path === 'password');
            const confirmpasswordError = validationError.inner.find((error) => error.path === 'confirmPassword');

            setSignupError({
                fullname: fullnameError && fullnameError.message,
                fullnameError: !!fullnameError,
        
                organization: organizationError && organizationError.message,
                organizationError: !!organizationError,
        
                contactNumber: contactnumberError && contactnumberError.message,
                contactNumberError: !!contactnumberError,
        
                email: emailError && emailError.message,
                emailError: !!emailError,
        
                password: passwordError && passwordError.message,
                passwordError: !!passwordError,
        
                confirmPassword: confirmpasswordError && confirmpasswordError.message,
                confirmPasswordError: !!confirmpasswordError,
            })
        }
    }


  return (

    <div
    style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
    }}
    >


    {/* background wallpaper */}
    <Background />


    <Grid
    container   
    direction="column"
    justifyContent="center"
    alignItems="center"
    style={{ 
        minHeight: "110vh"
    }}>   

        <Grid item xs={12} md={12} sm={12}>

            <Box
            container 
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
                width: state? '90vw' : '50vw',
                height: '100vh',
                backgroundColor: 'rgba(228, 235, 246, 0.9)', // Adjust the alpha value as needed
                borderRadius: '50px',
            }}
            padding={2}
            >
            
                <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                padding={2}>
 
                    {/* Images */}
                    <img src={LOGO} width={300} height={75} alt='helo friend' />

                {/* User Details */}

                    {/* full name */}
                    <TextField 
                    margin="normal"
                    variant='standard' 
                    label='Full Name' 
                    placeholder='First Name M.I Last Name' 
                    fullWidth 
                    inputProps={{style: {fontSize: 16}}} // font size of input text
                    InputLabelProps={{style: {fontSize: 16,color: '#6969696'}}} // font size of input label
                    autoFocus

                    value={signupDetails.fullname}
                    onChange={handleforFullname}

                    error={signupError.fullnameError}
                    helperText={signupError.fullname}

                    InputProps={{
                        startAdornment: 
                        <InputAdornment disableTypography position="end" style={{ marginRight: '8px' }}>
                            <DriveFileRenameOutlineIcon fontSize='large'  />
                        </InputAdornment>,
                    }}
                    />

                    {/* Organization */}
                    <TextField 
                    margin="normal"
                    variant='standard' 
                    label='Organization/Institution' 
                    placeholder='Enter your Organization/Institution' 
                    fullWidth 
                    inputProps={{style: {fontSize: 16}}} // font size of input text
                    InputLabelProps={{style: {fontSize: 16,color: '#6969696'}}} // font size of input label
                    value={signupDetails.organization}
                    onChange={handleforOrganization}

                    error={signupError.organizationError}
                    helperText={signupError.organization}

                    InputProps={{
                        startAdornment: 
                        <InputAdornment disableTypography position="end" style={{ marginRight: '8px' }}>
                            <CorporateFareIcon  fontSize='large'  />
                        </InputAdornment>,
                    }}
                    />

                    {/* Contact Number */}
                    <TextField 
                    margin="normal"
                    variant='standard' 
                    label='Contact Number' 
                    placeholder='e.g +639954456921 or 09954456921' 
                    fullWidth 
                    inputProps={{style: {fontSize: 16}}} // font size of input text
                    InputLabelProps={{style: {fontSize: 16,color: '#6969696'}}} // font size of input label
                    value={signupDetails.contactNumber}
                    onChange={handleforContactnumber}

                    error={signupError.contactNumberError}
                    helperText={signupError.contactNumber}

                    InputProps={{
                        startAdornment: 
                        <InputAdornment disableTypography position="end" style={{ marginRight: '8px' }}>
                            <CallIcon   fontSize='large'  />
                        </InputAdornment>,
                    }}
                    />

                    {/* email */}
                    <TextField 
                    margin="normal"
                    variant='standard' 
                    label='Email' 
                    placeholder='e.g youremail@gmail.com' 
                    type='email'
                    fullWidth 
                    inputProps={{style: {fontSize: 16}}} // font size of input text
                    InputLabelProps={{style: {fontSize: 16,color: '#6969696'}}} // font size of input label
                    value={signupDetails.email}
                    onChange={handleforEmail}

                    error={signupError.email}
                    helperText={signupError.emailError}

                    
                    InputProps={{
                        startAdornment: 
                        <InputAdornment disableTypography position="end" style={{ marginRight: '8px' }}>
                            <EmailIcon  fontSize='large'  /> 
                        </InputAdornment>,
                    }}
                    />

                    {/* Password */}
                    <TextField 
                    margin="normal"
                    variant='standard' 
                    label='Password' 
                    placeholder='Enter atleast 6 digit password' 
                    type={showPassword.password ? 'text' : 'password'}
                    fullWidth 
                    inputProps={{style: {fontSize: 16}}} // font size of input text
                    InputLabelProps={{style: {fontSize: 16,color: '#6969696'}}} // font size of input label
                    InputProps={{
                        endAdornment: 
                        <InputAdornment disableTypography position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end">
                                {showPassword.password ? <VisibilityOff fontSize='large' /> : <Visibility fontSize='large' />}
                            </IconButton>
                        </InputAdornment>,
                        startAdornment:
                        <InputAdornment disableTypography position="end" style={{ marginRight: '8px' }}>
                            <LockIcon fontSize='large' />
                        </InputAdornment>
                    }}
                    value={signupDetails.password}
                    onChange={handleforPassword}

                    error={signupError.passwordError}
                    helperText={signupError.password}
                    />

                    {/* Confirm Password */}
                    <TextField 
                    margin="normal"
                    variant='standard' 
                    label='Confirm Password' 
                    placeholder='Confirm your password' 
                    type={showPassword.confirmPassword ? 'text' : 'password'}
                    fullWidth 
                    inputProps={{style: {fontSize: 16}}} // font size of input text
                    InputLabelProps={{style: {fontSize: 16,color: '#6969696'}}} // font size of input label
                    InputProps={{
                        endAdornment: 
                        <InputAdornment disableTypography position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClick_ShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end">
                                {showPassword.confirmPassword ? <VisibilityOff fontSize='large' /> : <Visibility fontSize='large' />}
                            </IconButton>
                        </InputAdornment>,
                        startAdornment:
                            <InputAdornment disableTypography position="end" style={{ marginRight: '8px' }}>
                                <LockIcon fontSize='large' /> 
                            </InputAdornment>
                    }}
                    value={signupDetails.confirmPassword}
                    onChange={handleforConfirmpassword}

                    error={signupError.confirmPasswordError}
                    helperText={signupError.confirmPassword}
                    />

                    <Button 
                    variant='contained' 
                    fullWidth  
                    
                    style={{
                        textTransform: 'none',
                        fontFamily: 'sans-serif',
                        borderRadius: 25,
                        color: 'white', // Added explicit color to ensure text is visible
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', // Added a subtle shadow for depth
                        fontWeight: 'bold', // Added bold font weight
                        fontSize: '16px', // Adjusted font size for better readability
                        padding: '10px', // Adjusted padding for more comfortable touch interaction
                        transition: 'background-color 0.3s ease'
                    }}
                    onClick={handleforSubmit}
                    >Register</Button>       

                </Stack>
           
            </Box>

        </Grid>
        <Grid item xs={8}>
            
        </Grid>     
    
    </Grid>
    
    </div>
  )
}

export default Signup