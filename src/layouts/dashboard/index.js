

// EGEAD Fulfilment POD components
import MDBox from "components/MDBox";

// EGEAD Fulfilment POD example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data

// Dashboard components
import "react-datepicker/dist/react-datepicker.css";
function Dashboard() {


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>

      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
