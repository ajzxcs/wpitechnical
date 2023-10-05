import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import "./Notif.css"; // You can create a CSS file for custom styling

function Notifications() {
  // Create state variables for input values
  const [input1, setInput1] = useState({ name: "", content: "", image: null });
  const [input2, setInput2] = useState({ name: "", content: "", image: null });
  const [input3, setInput3] = useState({ name: "", content: "", image: null });
  const [input4, setInput4] = useState({ name: "", content: "", image: null });
  const [input5, setInput5] = useState({ name: "", content: "", image: null });
  const [input6, setInput6] = useState({ name: "", content: "", image: null });

  // Function to handle input changes for name and content
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
    console.log("Content:", input.content);
    console.log("Image File:", input.image);
  };

  return (
    <DashboardLayout>
    <h1 style={{ marginBottom: "20px" }}>Forum</h1> {/* Forum Header */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
      
        {/* Input Set 1 */}
        <div className="input-set">
          <p>Display 1</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input1.name}
            onChange={(e) => handleInputChange(input1, e)}
          />
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={input1.content}
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
          <p>Display 2</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input2.name}
            onChange={(e) => handleInputChange(input2, e)}
          />
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={input2.content}
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
          <p>Display 3</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input3.name}
            onChange={(e) => handleInputChange(input3, e)}
          />
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={input3.content}
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
          <p>Display 4</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input4.name}
            onChange={(e) => handleInputChange(input4, e)}
          />
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={input4.content}
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

        {/* Input Set 5 */}
        <div className="input-set">
          <p>Display 5</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input5.name}
            onChange={(e) => handleInputChange(input5, e)}
          />
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={input5.content}
            onChange={(e) => handleInputChange(input5, e)}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => handleFileChange(input5, e)}
          />
          <MDButton
            variant="contained"
            color="primary"
            onClick={() => handleUpload(input5)}
          >
            Upload
          </MDButton>
        </div>

        {/* Input Set 6 */}
        <div className="input-set">
          <p>Display 6</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input6.name}
            onChange={(e) => handleInputChange(input6, e)}
          />
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={input6.content}
            onChange={(e) => handleInputChange(input6, e)}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => handleFileChange(input6, e)}
          />
          <MDButton
            variant="contained"
            color="primary"
            onClick={() => handleUpload(input6)}
          >
            Upload
          </MDButton>
        </div>

        <MDButton
          variant="contained"
          color="warning"
          href="index.html" // Link to the index.html file
        >
          Login as SuperAdmin
        </MDButton>
        <Footer />
      </Grid>
    </DashboardLayout>
  );
}

export default Notifications;
