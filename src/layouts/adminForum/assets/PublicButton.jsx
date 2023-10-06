import React from "react";

const PublicButton = ({ onClick }) => {
  return (
    <button style={styles.button} onClick={onClick}>
      Public
    </button>
  );
};

const styles = {
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#4caf50"
  }
};

export default PublicButton;
