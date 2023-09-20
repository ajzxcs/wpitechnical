/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";
import MDButton from "components/MDButton";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

// ... (your existing imports and code)

function Overview() {
  const inputStyle = {
    width: "100%",
    padding: "12px", // Increase padding for a larger input
    fontSize: "16px", // Increase font size
    fontFamily: "Segoe UI, sans-serif", // Use Segoe UI font
    border: "1px solid #ccc", // Add a border for clarity
    borderRadius: "4px", // Add rounded corners
    boxSizing: "border-box", // Include padding and border in width
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header> <br></br><br></br>
        {/* Input Boxes */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <input type="text" placeholder="Email" style={inputStyle} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input type="text" placeholder="Old Password" style={inputStyle} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input type="text" placeholder="Number" style={inputStyle} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input type="text" placeholder="New Password" style={inputStyle} />
          </Grid>
        </Grid>
        
        {/* Buttons */}
        <MDBox mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <MDButton variant="contained" color="primary">
                Update Info
              </MDButton>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MDButton variant="contained" color="secondary">
                Change Password
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
