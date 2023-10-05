import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import "./Notif.css"; // You can create a CSS file for custom styling

function Team() {
  // Create state variables for input values
  const [input1, setInput1] = useState({ name: "", position: "", image: null });
  const [input2, setInput2] = useState({ name: "", position: "", image: null });
  const [input3, setInput3] = useState({ name: "", position: "", image: null });
  const [input4, setInput4] = useState({ name: "", position: "", image: null });

  // Function to handle input changes for name and position
  const handleInputChange = (input, event) => {
    const { name, value } = event.target;
    input({ ...input, [name]: value });
  };

  // Function to handle file input for images
  const handleFileChange = (input, event) => {
    const file = event.target.files[0];
    input({ ...input, image: file });
  };

  // Function to handle button click for each input set
  const handleUpload = (input) => {
    console.log("Name:", input.name);
    console.log("Position:", input.position);
    console.log("Image File:", input.image);
  };

  return (
    <DashboardLayout>
      <h1 style={{ marginBottom: "20px" }}>Teams</h1> {/* Forum Header */}
      <div className="input-grid">
        {/* Input Set 1 */}
        <div className="input-set">
          <p>Person 1</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input1.name}
            onChange={(e) => handleInputChange(input1, e)}
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={input1.position}
            onChange={(e) => handleInputChange(input1, e)}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => handleFileChange(input1, e)}
          />
          <MDButton
            variant="contained"
            color="primary"
            onClick={() => handleUpload(input1)}
          >
            Upload
          </MDButton>
        </div>

        {/* Input Set 2 */}
        <div className="input-set">
          <p>Person 2</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input2.name}
            onChange={(e) => handleInputChange(input2, e)}
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={input2.position}
            onChange={(e) => handleInputChange(input2, e)}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => handleFileChange(input2, e)}
          />
          <MDButton
            variant="contained"
            color="primary"
            onClick={() => handleUpload(input2)}
          >
            Upload
          </MDButton>
        </div>

        {/* Input Set 3 */}
        <div className="input-set">
          <p>Person 3</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input3.name}
            onChange={(e) => handleInputChange(input3, e)}
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={input3.position}
            onChange={(e) => handleInputChange(input3, e)}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => handleFileChange(input3, e)}
          />
          <MDButton
            variant="contained"
            color="primary"
            onClick={() => handleUpload(input3)}
          >
            Upload
          </MDButton>
        </div>

        {/* Input Set 4 */}
        <div className="input-set">
          <p>Person 4</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input4.name}
            onChange={(e) => handleInputChange(input4, e)}
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={input4.position}
            onChange={(e) => handleInputChange(input4, e)}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => handleFileChange(input4, e)}
          />
          <MDButton
            variant="contained"
            color="primary"
            onClick={() => handleUpload(input4)}
          >
            Upload
          </MDButton>
        </div>
      </div>

      <Footer />
    </DashboardLayout>
  );
}

export default Team;
