import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { AppBar, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TitlebarImageList from "./TitlebarImageList";

function Brands() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDeleteBrand = () => {
    if (selectedFile) {
      console.log(`Deleting brand: ${selectedFile.name}`);
      // Add your deletion logic here
    }
  };

  return (
    <DashboardLayout>
     
      <AppBar position="static" color="primary">
        <Toolbar>
        <MDTypography variant="h6" color="white">Brands</MDTypography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100vh",
        }}
      >
        <MDBox p={4}>
          <input
            type="file"
            accept=".jpg, .png, .jpeg"
            style={{ display: "none" }}
            onChange={handleFileChange}
            id="fileInput"
          />
          <label htmlFor="fileInput">
            <MDButton
              variant="outlined"
              color="primary"
              component="span"
            >
              Upload Photo 
            </MDButton>&nbsp;&nbsp;&nbsp;&nbsp;
          </label>
          {selectedFile && (
            <MDBox mt={2}>
              <MDTypography variant="body2">
                Selected File: {selectedFile.name}
              </MDTypography>
            </MDBox>
          )}
          
          <MDButton
          variant="outlined"  // Set the variant to "outlined"
          color="primary"    // Set the color to "primary"
          onClick={handleDeleteBrand}
          mt={2}
          >
          Delete a Brand
        </MDButton>
        </MDBox>
        <TitlebarImageList />
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default Brands;
