import React from "react";

import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";


// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";


// Firebase 
import { 
  totalForumPost,
  totalForumPost_Today,
  getUsers 
} from '../../firebase/Database'
// import { Button } from "@mui/material";


function Dashboard() {

  const [data,setData] = React.useState({
    totalPost: 0,
    todayPost: 0,
    totalUsers: 0,
  })

  React.useEffect(()=>{
    let isMounted = true; // A flag to track whether the component is still mounted

    if (isMounted) {
      // Initialize an empty newData object to accumulate changes
      let newData = { ...data };
  
      // Total forum post
      totalForumPost()
        .then((e) => {
          // Merge the new totalPost value with newData
          newData = { ...newData, totalPost: e };
  
          // Update the state with the accumulated changes
          setData(newData);
        })
        .catch((error) => console.log(error));
  
      // today forum post
      totalForumPost_Today()
        .then((e) => {
          // Merge the new todayPost value with newData
          newData = { ...newData, todayPost: e };
  
          // Update the state with the accumulated changes
          setData(newData);
        })
        .catch((error) => console.log(error));

      // get total user
      getUsers()
      .then((e) => {

        const total = e?.filter((data,key)=> { return data.Status === "Granted" }).length;

        // Merge the new todayPost value with newData
        newData = { ...newData, totalUsers: total };

        // Update the state with the accumulated changes
        setData(newData);
      })
      .catch((error) => console.log(error));

    }

    return () => {
      isMounted = false;
    };

  },[])

  return (
    <DashboardLayout>
      <DashboardNavbar />

      {/* Forum Visit today */}
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="face"
                title="Forum Visitor Today"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          
          {/* Forum total visitor */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="face"
                title="Forum Total Visitor"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>

          {/* Forum Post Today */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="create_icon"
                title="Forum Post Today"
                count={String(data.todayPost)}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>

          {/* Forum Total Post */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="create_icon"
                title="Forum Total Post"
                count={String(data.totalPost)}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>

          {/* Forum Total user */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person"
                title="Total Users"
                count={data.totalUsers}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>

          {/* Pending Tickest */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="attach_file"
                title="Pending Tickets"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>

          {/* <Grid item xs={12} md={6} lg={3}>
            <Button variant="contained" onClick={()=>getUsers().then(e=>console.log(e.length))}>Hello Friend</Button>
          </Grid> */}

        </Grid>
        
       
      </MDBox><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
