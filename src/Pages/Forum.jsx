import React, { useState } from "react";
import Public from "../Pages/Public";
import Private from "../Pages/Private";
// import PVPB from "../components/PVPB";

function Forum() {
  // const [showPublic, setShowPublic] = useState(false);
  // const [showPrivate, setShowPrivate] = useState(false);
  // const [showPVPB, setShowPVPB] = useState(true); // Add this state variable

  // const handlePublicClick = () => {
  //   setShowPublic(true);
  //   setShowPVPB(false); // Hide the PVPB component when Public component is shown
  // };

  // const handlePrivateClick = () => {
  //   setShowPrivate(true);
  //   setShowPVPB(false);
  // };

  // Get session storage
  const [checkStatus, setCheckStatus] = useState(false)

  React.useState(()=>{
    let sessionData = sessionStorage.getItem('TOKEN');
    sessionData === "Login" ?  setCheckStatus(true) : setCheckStatus(false)
    console.log( sessionData)

    // Cleanup function
    return () => {
      // Perform cleanup here if needed
          // This code will be executed when the component unmounts or when the dependencies change.
        };

  },[])

  return (
    <div className="App">
      {/* {showPVPB && ( // Conditionally render PVPB component based on showPVPB state
        <PVPB
          onPublicButtonClick={handlePublicClick}
          onPrivateButtonClick={handlePrivateClick}
        />
      )}
      {showPublic && <Public />}
      {showPrivate && <Private />} */}

      { checkStatus ?  <Private /> :  <Public />}


    </div>
  );
}

export default Forum