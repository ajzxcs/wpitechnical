// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import React from "react";
// import projectsTableData from "layouts/tables/data/projectsTableData";

// firebase
import { getUsers } from "../../firebase/Database"

function Tables() {

  const [Rows,setRows] = React.useState()

  // React.useEffect(() => {
  //   // Define an async function within useEffect
  //    const fetchData = async () => {
  //     try {
  //       const data = await getUsers();
  //       setRows(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  
  //   // Call the async function
  //   fetchData();
  // }, []);
  

  const { columns, rows } = authorsTableData(Rows);

  return (
    <DashboardLayout>
     
      <MDBox pt={6} pb={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  User Info
                </MDTypography>

              </MDBox>
              <MDBox pt={3}>



              {/* {rows ? alert("may laman") : alert("walang laman")} */}
              {rows && <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />}
                


              </MDBox>
            </Card>
        
                
           
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
