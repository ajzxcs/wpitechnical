import React from "react";
import PublicButton from "../assets/PublicButton";
import PrivateButton from "../assets/PrivateButton";

const PVPB = ({ onPublicButtonClick, onPrivateButtonClick }) => {
  return (
    <div style={styles.container}>
      <h2>Create a New Entry</h2>
      <div style={styles.buttonContainer}>
        <PublicButton onClick={onPublicButtonClick} />
        <PrivateButton onClick={onPrivateButtonClick} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between"
  }
};

export default PVPB;
