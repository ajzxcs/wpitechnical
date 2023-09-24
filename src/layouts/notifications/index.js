
import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
// import MDSnackbar from "components/MDSnackbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Notifications() {
  return (
    <DashboardLayout>
      

      {/* Centered Buttons */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "calc(100vh - 100px)" }} // Adjust the height as needed
      >
        <Grid item>
        <a href="youtube.com">
          <MDButton onClick={() => {
            window.open("https://wpi-projects-17ff6.web.app/Login", "_blank");
          }} variant="contained" color="primary">
            Login as Superadmin 
          </MDButton></a>
        </Grid>
        
      </Grid>

      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
