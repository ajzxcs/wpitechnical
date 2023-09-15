import { 
    Box,

    Fab,
    Grid, 
    Stack, 
    TextField 
} from '@mui/material'
import React from 'react'
import styled from 'styled-components';
import LOGO from '../assets/WPI crop.png'


const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("backG.JPG");
  background-size: cover;
  background-color: rgba(255, 255, 255); /* Adjust the opacity as needed */
  z-index: -1;
`;


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
        minHeight: "100vh"
    }}>   

        <Grid item xs={12} md={12} sm={12}>

            <Box
            container 
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
                width: state? '90vw' : '50vw',
                height: '80vh',
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
                    <TextField 
                    margin="normal"
                    variant='standard' 
                    label='Full Name' 
                    placeholder='Enter your fullname' 
                    fullWidth 
                    inputProps={{style: {fontSize: 16}}} // font size of input text
                    InputLabelProps={{style: {fontSize: 16,color: '#6969696'}}} // font size of input label
                    autoFocus
                    />

                    <TextField 
                    margin="normal"
                    variant='standard' 
                    label='Organization/Institution' 
                    placeholder='Enter your Org/Ins' 
                    fullWidth 
                    inputProps={{style: {fontSize: 16}}} // font size of input text
                    InputLabelProps={{style: {fontSize: 16,color: '#6969696'}}} // font size of input label
                    autoFocus
                    />

                    <TextField 
                    margin="normal"
                    variant='standard' 
                    label='Contact Number' 
                    placeholder='Enter your number' 
                    fullWidth 
                    inputProps={{style: {fontSize: 16}}} // font size of input text
                    InputLabelProps={{style: {fontSize: 16,color: '#6969696'}}} // font size of input label
                    autoFocus
                    />

                    <TextField 
                    margin="normal"
                    variant='standard' 
                    label='Password' 
                    placeholder='Enter your password' 
                    fullWidth 
                    inputProps={{style: {fontSize: 16}}} // font size of input text
                    InputLabelProps={{style: {fontSize: 16,color: '#6969696'}}} // font size of input label
                    autoFocus
                    />

                    <TextField 
                    margin="normal"
                    variant='standard' 
                    label='Confirm Password' 
                    placeholder='Confirm your password' 
                    fullWidth 
                    inputProps={{style: {fontSize: 16}}} // font size of input text
                    InputLabelProps={{style: {fontSize: 16,color: '#6969696'}}} // font size of input label
                    autoFocus
                    />


                    <Fab color='primary' variant='extended' sx={{
                        padding: "15px"
                    }} >Register</Fab>

                </Stack>
            </Box>

        </Grid>     
    
    </Grid>
    
    </div>
  )
}

export default Signup