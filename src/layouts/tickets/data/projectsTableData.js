/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";

export default function data() {
  // const User = ({ image, name, email }) => (
  //   <MDBox display="flex" alignItems="center" lineHeight={1}>
  //     <MDAvatar src={image} name={name} size="sm" />
  //     <MDBox ml={2} lineHeight={1}>
  //       <MDTypography display="block" variant="button" fontWeight="medium">
  //         {name}
  //       </MDTypography>
  //       <MDTypography variant="caption">{email}</MDTypography>
  //     </MDBox>
  //   </MDBox>
  // );

  // const Institution = ({ title, description }) => (
  //   <MDBox lineHeight={1} textAlign="left">
  //     <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
  //       {title}
  //     </MDTypography>
  //     <MDTypography variant="caption">{description}</MDTypography>
  //   </MDBox>
  // );

  return {
    columns: [
      { Header: "Full Name", accessor: "name", width: "45%", align: "left" },
      { Header: "Address", accessor: "address", align: "left" },
      { Header: "Institution", accessor: "institution", align: "left" },
      { Header: "Contact Number", accessor: "contactNumber", align: "center" },
      { Header: "Brand", accessor: "brand", align: "center" },
      { Header: "Model", accessor: "model", align: "center" },
      { Header: "Serial Number", accessor: "serialNumber", align: "center" },
      { Header: "Issue", accessor: "issue", align: "center" },
      { Header: "Schedule", accessor: "schedule", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Email", accessor: "email", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        name: "John Michael",
        address: "123 Main St",
        institution: "Hospital",
        contactNumber: "123-456-7890",
        brand: "Brand A",
        model: "Model X",
        serialNumber: "SN-12345",
        issue: "Technical Issue",
        schedule: "12/15/2023",
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="granted" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        email: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            john@creative-tim.com
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        name: "Alexa Liras",
        address: "456 Elm St",
        institution: "Hospital",
        contactNumber: "987-654-3210",
        brand: "Brand B",
        model: "Model Y",
        serialNumber: "SN-54321",
        issue: "Hardware Issue",
        schedule: "12/18/2023",
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="pending" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        email: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            alexa@creative-tim.com
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        name: "Laurent Perrier",
        address: "789 Oak St",
        institution: "Hospital",
        contactNumber: "555-555-5555",
        brand: "Brand C",
        model: "Model Z",
        serialNumber: "SN-98765",
        issue: "Software Issue",
        schedule: "12/20/2023",
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="granted" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        email: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            laurent@creative-tim.com
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        name: "Michael Levi",
        address: "101 Pine St",
        institution: "Medical Center",
        contactNumber: "111-222-3333",
        brand: "Brand D",
        model: "Model M",
        serialNumber: "SN-55555",
        issue: "Network Issue",
        schedule: "12/22/2023",
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="granted" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        email: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            michael@creative-tim.com
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        name: "Richard Gran",
        address: "246 Maple St",
        institution: "Medical Clinic",
        contactNumber: "777-888-9999",
        brand: "Brand E",
        model: "Model N",
        serialNumber: "SN-98765",
        issue: "Battery Issue",
        schedule: "12/25/2023",
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="pending" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        email: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            richard@creative-tim.com
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        name: "Miriam Eric",
        address: "333 Cedar St",
        institution: "Medical Center",
        contactNumber: "444-555-6666",
        brand: "Brand F",
        model: "Model O",
        serialNumber: "SN-24680",
        issue: "Display Issue",
        schedule: "12/28/2023",
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="pending" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        email: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            miriam@creative-tim.com
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        name: "John Doe",
        address: "999 Oak St",
        institution: "Hospital",
        contactNumber: "123-123-1234",
        brand: "Brand G",
        model: "Model P",
        serialNumber: "SN-13579",
        issue: "Audio Issue",
        schedule: "01/02/2024",
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="granted" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        email: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            johndoe@example.com
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        name: "Jane Smith",
        address: "777 Elm St",
        institution: "Medical Clinic",
        contactNumber: "555-444-3333",
        brand: "Brand H",
        model: "Model Q",
        serialNumber: "SN-11111",
        issue: "Charging Issue",
        schedule: "01/05/2024",
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="pending" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        email: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            janesmith@example.com
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        name: "Sarah Johnson",
        address: "555 Cedar St",
        institution: "Medical Center",
        contactNumber: "666-777-8888",
        brand: "Brand I",
        model: "Model R",
        serialNumber: "SN-22222",
        issue: "Camera Issue",
        schedule: "01/08/2024",
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="granted" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        email: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            sarahjohnson@example.com
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        name: "Tom Williams",
        address: "111 Pine St",
        institution: "Hospital",
        contactNumber: "123-987-6543",
        brand: "Brand J",
        model: "Model S",
        serialNumber: "SN-33333",
        issue: "Touchscreen Issue",
        schedule: "01/11/2024",
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="pending" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        email: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            tomwilliams@example.com
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
      {
        name: "Emily Davis",
        address: "888 Oak St",
        institution: "Medical Clinic",
        contactNumber: "987-123-4567",
        brand: "Brand K",
        model: "Model T",
        serialNumber: "SN-44444",
        issue: "Battery Issue",
        schedule: "01/14/2024",
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="granted" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        email: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            emilydavis@example.com
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      },
    ],
  };
}
