import React, { useState } from "react";
import Public from "../Pages/Public";
import Private from "../Pages/Private";
import PVPB from "../components/PVPB";

function Forum() {
  const [showPublic, setShowPublic] = useState(false);
  const [showPrivate, setShowPrivate] = useState(false);
  const [showPVPB, setShowPVPB] = useState(true); // Add this state variable

  const handlePublicClick = () => {
    setShowPublic(true);
    setShowPVPB(false); // Hide the PVPB component when Public component is shown
  };

  const handlePrivateClick = () => {
    setShowPrivate(true);
    setShowPVPB(false);
  };

  return (
    <div className="App">
      {showPVPB && ( // Conditionally render PVPB component based on showPVPB state
        <PVPB
          onPublicButtonClick={handlePublicClick}
          onPrivateButtonClick={handlePrivateClick}
        />
      )}
      {showPublic && <Public />}
      {showPrivate && <Private />}
    </div>
  );
}

export default Forum