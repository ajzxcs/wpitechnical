import React from 'react'

// Pages
import Home from './Home'
import Services from './Services'
import Forum from './Forum'
import About from './About'
import AppBars from '../../Components/Appbars'

// components and icons
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';


// scroll effects
import { Element, Link } from 'react-scroll'

const Homepage = () => {
  const [isFaded, setIsFaded] = React.useState(false);

  React.useEffect(() => {
    // Handler to update the fading state based on scroll position
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsFaded(scrollTop > 200);
    };

    // Add scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  return (
    <div>
      {/* Navbar or header */}
      <AppBars/>

      {/* route to pages */}
      <Element name="home">
        <Home/>
      </Element>

      <Element name="services">
        <Services/>
      </Element>

      <Element name="forum">
        <Forum/>
      </Element>

      <Element name="about">
        <About/>
      </Element>

      {/* Scroll to top */}
      <Fade in={isFaded}>
        <Fab color='primary' sx={{ position: 'fixed', bottom: 110, right: 37 }} onClick={e=>e.preventDefault()}>
          <Link
          to="home"
          spy={true}
          smooth={true}
          offset={-200}
          duration={500}> 
            <Stack>
              <KeyboardArrowUpIcon />
            </Stack>
          </Link>
          
        </Fab>
      </Fade>
    </div>
  )
}

export default Homepage