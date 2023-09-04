import React, { useState, useEffect } from "react";
import { Navigation } from "../components/navigation";
import { Header } from "../components/header";
import { Brand } from "../components/brand";
import { About } from "../components/about";
import { Services } from "../components/services";
import { Gallery } from "../components/gallery";
import { Forum } from "../components/forum";
import { Team } from "../components/Team";
import { Contact } from "../components/contact";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";


export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 800,
    speedAsDuration: true,
  });

  
const Homepage = () => {
    const [landingPageData, setLandingPageData] = useState({});

    useEffect(() => {
      let cleanUp = true;

      if (cleanUp) {
        setLandingPageData(JsonData);
      }
        return ()=>cleanUp=false;
    }, []);
  
  return (
    <div>      

        {/* Appbar Nvaigation */}
        <Navigation />
        
        {/* Pages */}
        <Header data={landingPageData.Header} />
        <Brand data={landingPageData.Brand} />
        <About data={landingPageData.About} />
        <Services data={landingPageData.Services} />
        <Gallery data={landingPageData.Gallery} />
        <Forum data={landingPageData.Forum} />
        <Team data={landingPageData.Team} />
        <Contact data={landingPageData.Contact} />
    
    </div>
  )
}

export default Homepage