// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import ticketdata from "layouts/tickets/data/ticketdata";
import * as XLSX from 'xlsx';
import React, { useEffect, useState } from "react";
import { importZoho, viewZOHO, viewTickets } from '../../firebase/Database';

function Tickets() {
  const [rowss, setROws] = useState([]);
  const [filteredRows1, setFilteredRows1] = useState([]);
  const [filteredRows2, setFilteredRows2] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [columnsDta, setColumnsDta] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const data = await viewTickets();
        setROws(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (mounted) {
      viewZOHO().then((E) => {
        setColumnsDta(E.column);
        setExcelData(E.data);
      });

      viewTickets().then((E) => {
        E?.map((data, key) => {
          return setROws(data);
        });

        fetchData();
      });
    }

    return () => (mounted = false);
  }, []);

  const handleSearchTable1 = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredData = rowss?.filter((row) => {
      return Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchText)
      );
    });
    setFilteredRows1(filteredData);

    console.log("pang filter", filteredData)

    console.log("hindi filter",rowss )
  };

  const handleSearchTable2 = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredData = excelData.filter((row) => {
      return Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchText)
      );
    });
    setFilteredRows2(filteredData);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      const firstRow = sheetData[0];
      const extractedColumns = [];
      for (const key in firstRow) {
        if (firstRow.hasOwnProperty(key)) {
          extractedColumns.push({
            Header: key,
            accessor: key,
            align: "center",
          });
        }
      }

      importZoho(sheetData, extractedColumns);
    };

    reader.readAsArrayBuffer(file);
  };

  const { columns, rows } = ticketdata(rowss);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      {/* Ticket from not zoho */}
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
                table={{
                  columns,
                  rows: filteredRows1.length > 0 ? filteredRows1 : rows,
                }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </Card>
        </Grid>
      </MDBox>

      {/* Ticket from zoho */}
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
              <Grid container>
                <Grid item xs={12} md={12} spacing={2}>
                  <MDTypography variant="h6" color="white">
                    Tickets from Zoho
                  </MDTypography>
                </Grid>
                <Grid item xs={12} md={3} sm={12}>
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
                </Grid>
                <Grid item xs={12} md={3} sm={12}>
                  <input
                    type="file"
                    accept=".xlsx"
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                    id="fileInput"
                  />
                  <label htmlFor="fileInput">
                    <MDButton
                      variant="outlined"
                      component="span"
                    >
                      Import excel file
                    </MDButton>&nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                </Grid>
              </Grid>
            </MDBox>
            <MDBox pt={3}>
              <DataTable
                table={{
                  columns: columnsDta,
                  rows: filteredRows2.length > 0 ? filteredRows2 : excelData,
                }}
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
