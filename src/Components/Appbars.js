import React from 'react';

// components
import { 
  Grid, 
  Stack,
  Divider,
  Button,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar
} from '@mui/material';
import { Link } from 'react-scroll'

// icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { 
  FaViber,
  FaFacebook,
  FaLinkedinIn,
  FaYoutube 
} from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// Logo
import LOGO from '../assets/images/wellness-logov2.png'
import '../assets/styles/Appbars.css'

const AppBars = () => {
  const [state,setState] = React.useState(true)

  React.useEffect(()=>{
    const setResponsiveness = () => {
      return window.innerWidth < 700 ? setState(true) : setState(false)
    }

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.addEventListener("resize", () => setResponsiveness());
    }
  },[])
  return (
    <div>
      {state ? <MobileMode/> : <DestopMode/>}
      
    </div>
  )
}

export default AppBars


// For Desktop mode
const DestopMode = () =>{

  const [variants,setVariants] = React.useState({
    home: 'primary',
    services: 'disabled',
    forum: 'disabled',
    about: 'disabled'
    
  })

  const handleSetActive = (sectionName) => {
    setVariants({
      home: sectionName === 'home'? 'primary' : 'disabled',
      services: sectionName === 'services'? 'primary' : 'disabled',
      forum: sectionName === 'forum'? 'primary' : 'disabled',
      about: sectionName === 'about'? 'primary' : 'disabled',
      
    })
  }

  return (
    <div>

{/* Information */}
      <Grid container sx={{ backgroundColor: "#666666", paddingX:3, paddingY:1 }}  
      direction="row"
      justifyContent="center"
      alignItems="center">

        {/* Location */}
        <Grid item xs={12} md={6} >
          <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}>
            <LocationOnIcon color='secondary'/>
            <Typography color='white'>56 San Rafael St, Pasig, 1603, Metro Manila Phillippines</Typography>
          </Stack>
        </Grid>

        {/* Contacts */}
        <Grid item xs={12} md={6}>

          <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}>

            {/* Viber */}
            <FaViber fontSize={30} color='white'/>
            <Typography color='white'>+63 947 3117 641</Typography>
            <div></div>
            <div></div>


            {/* Facebook */}
            <IconButton size="small" color='secondary'>
              <FaFacebook fontSize={30}/>
            </IconButton>
            <Divider orientation="vertical" flexItem />

            {/* LinkedIn */}
            <IconButton size="small" color='secondary'>
              <FaLinkedinIn fontSize={30}/>
            </IconButton>
            <Divider orientation="vertical" flexItem />
            
            {/* Youtube */}
            <IconButton size="small" color='secondary'>
              <FaYoutube fontSize={30}/>
            </IconButton>
            <Divider orientation="vertical" flexItem />

            {/* Instagram */}
            <IconButton size="small" color='secondary'>
              <BsInstagram fontSize={30}/>
            </IconButton>

          </Stack>

        </Grid>
      </Grid>

{/* Header */}
      <AppBar position='static' color='secondary'>
        <Toolbar>
 
          <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1,  paddingTop:1, display: { xs: 'none', sm: 'block' }}}>
            <img src={LOGO} alt='ASD' width={250} height={70}/>
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

            <Button color={variants.home}>
              <Link
              to="home"
              spy={true}
              smooth={true}
              offset={-200}
              duration={500}
              onSetActive={active=>handleSetActive(active)}
              >
                home
              </Link>
                
            </Button>

            <Button color={variants.services}>
              <Link
              to="services"
              spy={true}
              smooth={true}
              offset={70}
              duration={500}
              onSetActive={active=>handleSetActive(active)}>
                services
              </Link>
            </Button>

            <Button color={variants.forum}>
              <Link
              to="forum"
              spy={true}
              smooth={true}
              offset={70}
              duration={500}
              onSetActive={active=>handleSetActive(active)}>
                forum
              </Link>
            </Button>

            <Button color={variants.about}>
              <Link
              to="about"
              spy={true}
              smooth={true}
              offset={100}
              duration={500}
              onSetActive={active=>handleSetActive(active)}>
                about
              </Link>
            </Button>

          </Box>
        
        </Toolbar>
      </AppBar>
    </div>
  );
}

// For mobile mode
const MobileMode = () =>{
  const [isOpen, setIsOpen] = React.useState(true);

  const handleButtonClick = e => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return(
    <div>
      <AppBar position='static' color='secondary'>
        <Toolbar>

          <Typography
          onClick={()=>alert("Hello Friend")}
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, paddingTop:1, display: {  sm: 'block' }}}>
            <img src={LOGO} alt='ASD' width={250} height={70}/>
          </Typography>

          <Box sx={{ display: { sm: 'block' } }}>
            
            <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            >
              <Divider orientation="vertical" flexItem />

{/*               <Zoom in={isOpen}> */}
<IconButton className={`toggle-icon-button ${isOpen ? 'open' : 'closed'}`} onClick={handleButtonClick}>

                {isOpen ? <MenuIcon sx={{ fontSize: 40 }} /> : <CloseIcon sx={{ fontSize: 40 }} />}
                
              </IconButton>
              {/* </Zoom> */}
            </Stack>
          </Box>

        </Toolbar>
      </AppBar>
  </div>)
}
