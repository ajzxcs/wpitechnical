import React from 'react'

import Home from './Home'
import Services from './Services'
import Forum from './Forum'
import About from './Home'
import AppBars from '../../Components/Appbars'

const Homepage = () => {
  return (
    <div>
      <AppBars/>
        <Home/>
        <Services/>
        <Forum/>
        <About/>
    </div>
  )
}

export default Homepage