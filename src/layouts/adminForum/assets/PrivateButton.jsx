import React from "react";

const PrivateButton = ({ onClick }) => {
  return (
    <button
      style={{ ...styles.button, backgroundColor: "#f44336" }}
      onClick={onClick}
    >
      Private
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
    color: "#fff"
  }
};

export default PrivateButton;
