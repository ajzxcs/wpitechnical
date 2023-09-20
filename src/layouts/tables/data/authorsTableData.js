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
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const User = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Institution = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "User", accessor: "user", width: "45%", align: "left" },
      { Header: "Institution", accessor: "institution", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Email", accessor: "email", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        user: <User image={team2} name="John Michael" email="john@creative-tim.com" />,
        institution: <Institution title="Hospital" description="Doctor" />,
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
        user: <User image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
        institution: <Institution title="Hospital" description="Pediatrician" />,
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
        user: <User image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
        institution: <Institution title="Hospital" description="Surgeon" />, // Updated to medical field
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
        user: <User image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
        institution: <Institution title="Medical Center" description="Doctor" />, // Updated to medical field
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
        user: <User image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
        institution: <Institution title="Medical Clinic" description="Nurse" />, // Updated to medical field
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
        user: <User image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
        institution: <Institution title="Medical Center" description="Nurse" />, // Updated to medical field
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
        user: <User image={team2} name="John Doe" email="johndoe@example.com" />,
        institution: <Institution title="Hospital" description="Nurse" />,
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
        user: <User image={team3} name="Jane Smith" email="janesmith@example.com" />,
        institution: <Institution title="Medical Clinic" description="Nurse" />,
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
        user: <User image={team4} name="Sarah Johnson" email="sarahjohnson@example.com" />,
        institution: <Institution title="Medical Center" description="Doctor" />,
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
        user: <User image={team2} name="Tom Williams" email="tomwilliams@example.com" />,
        institution: <Institution title="Hospital" description="Doctor" />,
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
        user: <User image={team3} name="Emily Davis" email="emilydavis@example.com" />,
        institution: <Institution title="Medical Clinic" description="Nurse" />,
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
