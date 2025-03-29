

// EGEAD Fulfilment POD components
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";

// EGEAD Fulfilment POD example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data

// Dashboard components
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
function Dashboard() {
  const dashboard = useSelector((state) => state.drop.dashboard);
  const labels = Object.keys(dashboard);
  const people = [...new Set(labels.flatMap(date => Object.keys(dashboard[date])))];
  const datasets = people.map((person, index) => ({
    label: person,
    color: ["primary", "secondary", "info", "success", "warning", "error", "dark"][index % 7], // Chọn màu theo vòng lặp
    data: labels.map(date => dashboard[date][person] || 0) // Nếu không có dữ liệu ngày đó thì mặc định là 0
  }));
  const chartData = { labels, datasets };
  console.log(chartData)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <MDBox mb={3}>
              <DefaultLineChart
                color="info"
                title="Listing"
                description="KPI Listing theo ngày"
                chart={chartData}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
