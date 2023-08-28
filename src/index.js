import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  typography: {
    "fontFamily": 'sans-serif',
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    allVariants: {
      color: '#00ACED'
    }
  },

  palette: {
    background: {
      default: '#FFFFFF', // Set your desired background color here
    },
    
    primary: {
      main: '#3399CC',
    },
    secondary: {
      main: '#FFFFFF',
    },
    disabled: {
      main: "#666666"
    },
    info: {
      main: '#3399CC',
    },
    text:{
      primary: "rgb(61, 152, 154)",
      disabled: 'rgb(12, 14, 36)',
    },
    error:{
      main: '#c71e1e',
    },
    warning:{
      main: '#ff8c00'
    },
    success:{
      main: '#32cd32'
    },
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <CssBaseline />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
  
        <App />
 
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);


