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
  getUsers,
  viewZOHO,
  forumVisitToday,
  totalForumVisit,
  pendingTickestTotal
} from '../../firebase/Database'

import { Button } from "@mui/material";


function Dashboard() {

  const [data,setData] = React.useState({
    totalPost: 0,
    todayPost: 0,
    totalUsers: 0,
    totalPending: 0,
    visitToday: 0,
    totalVisit: 0,
    totalPendingTicks: 0
  })

  const [date,setaDte] = React.useState("1/1/2000")

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  


  React.useEffect(()=>{
    let isMounted = true; // A flag to track whether the component is still mounted
    

    if (isMounted) {

      // Initialize an empty newData object to accumulate changes
      let newData = { ...data };

      // Forum Visit today
      forumVisitToday().then(e=>{
        
        // Merge the new totalPost value with newData
        newData = { ...newData, visitToday: e };
  
        // Update the state with the accumulated changes
        setData(newData);
      })

      // totalVisit
      totalForumVisit().then(e=>{
        
        // Merge the new totalPost value with newData
        newData = { ...newData, totalVisit: e };
  
        // Update the state with the accumulated changes
        setData(newData);
      })
  
      // Total forum post
      totalForumPost().then((e) => {
          // Merge the new totalPost value with newData
          newData = { ...newData, totalPost: e };
  
          // Update the state with the accumulated changes
          setData(newData);
        })
        .catch((error) => console.log(error));
  
      // today forum post
      totalForumPost_Today().then((e) => {
          // Merge the new todayPost value with newData
          newData = { ...newData, todayPost: e };
  
          // Update the state with the accumulated changes
          setData(newData);
        })
        .catch((error) => console.log(error));

      // get total user
      getUsers().then((e) => {

        const total = e?.filter((data,key)=> { return data.Status === "Granted" }).length;

        // Merge the new todayPost value with newData
        newData = { ...newData, totalUsers: total };

      })
      .catch((error) => console.log(error));

      // get the pending tickets
      pendingTickestTotal().then((e) => {

    

        // Merge the new todayPost value with newData
        newData = { ...newData, totalPendingTicks: e };

        // Update the state with the accumulated changes
        setData(newData);
      })
      .catch((error) => console.log(error));

      // get the pending tickets
      viewZOHO().then((e) => {

        const total = e?.data.length;

        // Merge the new todayPost value with newData
        newData = { ...newData, totalPending: total };

        // Update the state with the accumulated changes
        setData(newData);


        const [month, day, year] = e?.date.split('/');
        const formattedDate = `${months[parseInt(month) - 1]} ${parseInt(day)} ${year}`;
        setaDte(formattedDate)
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
                count={data.visitToday}
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
                count={data.totalVisit}
                percentage={{
                  color: "success",
                  amount: "",
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
                  amount: "",
                  label: "",
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
                  label: "Just Updated",
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
                count={data.totalPendingTicks}
                percentage={{
                  color: "success",
                  amount: "",
                  label:  "From ticketing form",
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
                title="ZOHO Pending Tickets "
                count={data.totalPending}
                percentage={{
                  color: "success",
                  amount: "",
                  label:  date,
                }}
              />
            </MDBox>
          </Grid>




          {/* <Grid item xs={12} md={6} lg={3}>
            <Button variant="contained" onClick={()=>pendingTickestTotal().then(e=>console.log(e))}>Hello Friend</Button>
          </Grid> */}

        </Grid>
        
       
      </MDBox><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
