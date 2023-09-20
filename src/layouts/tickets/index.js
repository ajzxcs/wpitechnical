// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import ticketdata from "layouts/tickets/data/ticketdata";
import data2 from "layouts/tickets/data/projectsTableData"; // Import the second data source

function Tickets() {
  const { columns, rows } = ticketdata();
  const { columns: columns2, rows: rows2 } = data2(); // Use the second data source

  const handleSearchTable1 = (event) => {
    // Handle search logic for Table 1 here
  };

  const handleSearchTable2 = (event) => {
    // Handle search logic for Table 2 here
  };

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
                Tickets from Website
              </MDTypography>
              <TextField
                variant="outlined"
                size="small"
                label="Search"
                onChange={handleSearchTable1}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </MDBox>
            <MDBox pt={3}>
              <DataTable
                table={{ columns, rows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </Card>
        </Grid>
      </MDBox>

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
                Tickets from Zoho
              </MDTypography>
              <TextField
                variant="outlined"
                size="small"
                label="Search"
                onChange={handleSearchTable2}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </MDBox>
            <MDBox pt={3}>
              <DataTable
                table={{ columns: columns2, rows: rows2 }} // Use the second data source
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </Card>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tickets;
