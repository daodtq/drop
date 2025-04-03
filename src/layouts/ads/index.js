/**
=========================================================
* EGEAD Fulfilment POD - v2.2.0
=========================================================

* Product Page: https://www.egeadcompany.com/product/material-dashboard-react
* Copyright 2023 Dev Egead Company (https://www.egeadcompany.com)

Coded by www.egeadcompany.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// EGEAD Fulfilment POD components
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
// EGEAD Fulfilment POD example components
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
);

function formatValue(value) {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M"; // Chuyển đổi sang triệu
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + "K"; // Chuyển đổi sang nghìn
  } else {
    return value.toString(); // Giữ nguyên giá trị nhỏ hơn 1000
  }
}

const MultiLineChart = ({ storeData }) => {
  // Helper function to scale data proportionally to fit within same range for chart display

  // Generate a chart for each campaign
  const generateCharts = (storeData) => {
    const charts = [];

    storeData.forEach((store, storeIndex) => {
      Object.entries(store.data).forEach(([campaignName, campaignData], campaignIndex) => {
        const dates = campaignData.map((entry) => entry.date);
        const impressions = campaignData.map((entry) => entry.impressions);
        const clicks = campaignData.map((entry) => entry.clicks);
        const costs = campaignData.map((entry) => entry.cost);
        const conversionValues = campaignData.map((entry) => entry.conversionValue);

        const totalImpressions = impressions.reduce((a, b) => a + b, 0);
        const totalClicks = clicks.reduce((a, b) => a + b, 0);
        const totalCosts = costs.reduce((a, b) => a + b, 0);
        const totalConversionValues = conversionValues.reduce((a, b) => a + b, 0);


        const chartData = {
          labels: dates,
          datasets: [
            {
              label: "Impressions",
              data: impressions,
              borderColor: "#1a73e8",
              yAxisID: "y1",
              pointRadius: 0,
              borderWidth: 2
            },
            {
              label: "Clicks",
              data: clicks,
              borderColor: "#f9ab00",
              yAxisID: "y2",
              pointRadius: 0,
              borderWidth: 2
            },
            {
              label: "Costs",
              data: costs,
              borderColor: "#1e8e3e",
              yAxisID: "y2",
              pointRadius: 0,
              borderWidth: 2
            },
            {
              label: "Conversion Value",
              data: conversionValues,
              borderColor: "#d93025",
              yAxisID: "y2",
              pointRadius: 0,
              borderWidth: 2
            },
          ],
        };

        const options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: `${store.store} - ${campaignName}`,
            },
            tooltip: {
              mode: "index",
              intersect: false,
              callbacks: {
                label: (tooltipItem) => {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                },
              },
            },
          },
          hover: {
            mode: "index",
            intersect: false,
          },
          scales: {
            y1: {
              type: "linear",
              position: "left",
              title: {
                display: true,
              },
              ticks: {
                beginAtZero: true,
                min: 0,
                display: false,
              },
              grid: {
                drawTicks: false,
                drawBorder: false,
                drawOnChartArea: true,
                color: "rgba(200, 200, 200, 0.2)",
              },
            },
            y2: {
              type: "linear",
              position: "right",
              title: {
                display: true,
              },
              ticks: {
                display: false,
                beginAtZero: true,
                min: 0,

              },
              grid: {
                drawTicks: false, // Không vẽ các dấu tick
                drawBorder: false, // Không vẽ đường viền của trục y1
                drawOnChartArea: false,
              },
            },
            x: {
              grid: {
                drawOnChartArea: false,
              },
            },
          },
        };

        charts.push(
          <Grid item xs={12} md={6} lg={6}>
            <Card key={`${storeIndex}-${campaignIndex}`} style={{ display: "inline-block", width: "100%" }}>
              <div style={{ display: "flex" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ backgroundColor: "#f9ab00", color: "white", borderRadius: "10px 0 0 0" }}>
                    <div style={{ margin: "16px 50px 16px 16px" }}>
                      <p style={{
                        fontFamily: "Roboto, Arial, sans-serif",
                        lineHeight: "1.25rem",
                        fontSize: "0.875rem",
                        letterSpacing: "0.0142857143em",
                        fontWeight: 400,
                        whiteSpace: "nowrap"
                      }}>Clicks:</p>
                      <div style={{
                        fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                        lineHeight: "2.5rem",
                        fontSize: "26px",
                        letterSpacing: "0",
                        fontWeight: 400,
                        transformOrigin: "left",
                        whiteSpace: "nowrap"
                      }}>{totalClicks}</div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: "#1a73e8", color: "white" }}>
                    <div style={{ margin: "16px 50px 16px 16px" }}>
                      <p style={{
                        fontFamily: "Roboto, Arial, sans-serif",
                        lineHeight: "1.25rem",
                        fontSize: "0.875rem",
                        letterSpacing: "0.0142857143em",
                        fontWeight: 400,
                        whiteSpace: "nowrap"
                      }}>Impressions:</p>
                      <div style={{
                        fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                        lineHeight: "2.5rem",
                        fontSize: "26px",
                        letterSpacing: "0",
                        fontWeight: 400,
                        transformOrigin: "left",
                        whiteSpace: "nowrap"
                      }}>{formatValue(totalImpressions)}</div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: "#d93025", color: "white" }}>
                    <div style={{ margin: "16px 50px 16px 16px" }}>
                      <p style={{
                        fontFamily: "Roboto, Arial, sans-serif",
                        lineHeight: "1.25rem",
                        fontSize: "0.875rem",
                        letterSpacing: "0.0142857143em",
                        fontWeight: 400,
                        whiteSpace: "nowrap"
                      }}>Conv. Value:</p>
                      <div style={{
                        fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                        lineHeight: "2.5rem",
                        fontSize: "26px",
                        letterSpacing: "0",
                        fontWeight: 400,
                        transformOrigin: "left",
                        whiteSpace: "nowrap"
                      }}> {formatValue(totalConversionValues.toFixed(2))}</div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: "#1e8e3e", color: "white" }}>
                    <div style={{ margin: "16px 50px 16px 16px" }}>
                      <p style={{
                        fontFamily: "Roboto, Arial, sans-serif",
                        lineHeight: "1.25rem",
                        fontSize: "0.875rem",
                        letterSpacing: "0.0142857143em",
                        fontWeight: 400,
                        whiteSpace: "nowrap"
                      }}>Costs</p>
                      <div style={{
                        fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                        lineHeight: "2.5rem",
                        fontSize: "26px",
                        letterSpacing: "0",
                        fontWeight: 400,
                        transformOrigin: "left",
                        whiteSpace: "nowrap"
                      }}>{`$${formatValue(totalCosts.toFixed(2))}`}</div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: "#f9ab00", color: "white" }}>
                    <div style={{ margin: "16px 50px 16px 16px" }}>
                      <p style={{
                        fontFamily: "Roboto, Arial, sans-serif",
                        lineHeight: "1.25rem",
                        fontSize: "0.875rem",
                        letterSpacing: "0.0142857143em",
                        fontWeight: 400,
                        whiteSpace: "nowrap"
                      }}>Actual ROAS</p>
                      <div style={{
                        fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                        lineHeight: "2.5rem",
                        fontSize: "26px",
                        letterSpacing: "0",
                        fontWeight: 400,
                        transformOrigin: "left",
                        whiteSpace: "nowrap"
                      }}>{`${(totalConversionValues ? totalConversionValues / totalCosts * 100 : 0).toFixed(2)}%`}</div>
                    </div>
                  </div>
                </div>
                <div>

                </div>
              </div>
              <div style={{ height: "192px", width: "100%" }}>
                <Line data={chartData} options={options} />
              </div>

            </Card ></Grid>
        );
      });
    });

    return charts;
  };

  return generateCharts(storeData)
};


function Ads() {
  const data = useSelector((state) => state.drop.data2);
  const products = useSelector((state) => state.drop.product2);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
        <Grid container spacing={4}>
          {data.length ? <MultiLineChart storeData={data} /> : null}
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "id", accessor: "id", align: "center" },
                      { Header: "store", accessor: "store", align: "center" },
                      { Header: "title", accessor: "title", align: "left" },
                      { Header: "clicks", accessor: "clicks", align: "left" },
                      { Header: "impressions", accessor: "impressions", align: "left" },
                      { Header: "CTR", accessor: "ctr", align: "left" },
                      { Header: "Avg. CPC", accessor: "cpc", align: "left" },
                      { Header: "cost", accessor: "cost", align: "left" },
                    ],
                    rows: products && products.length > 0 ? [...products.map((items, index) => ({
                      id: <p style={{ color: "#1a73e8" }}> {items.productId}</p>,
                      store: items.store,
                      title: <a href={`https://${items.store}.com?p=${items.productId}`} style={{ color: "#1a73e8 " }}> {items.title}</a>,
                      ctr: `${((items.clicks / items.impressions) * 100).toFixed(2)}%`,
                      cpc: `$${(items.cost / items.clicks).toFixed(2)}`,
                      cost: items.cost,
                      impressions: items.impressions,
                      clicks: items.clicks,
                    })
                    )] : []
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />

              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout >
  );
}
MultiLineChart.propTypes = {
  storeData: PropTypes.arrayOf(
    PropTypes.shape({
      store: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string.isRequired,
          impressions: PropTypes.number.isRequired,
          clicks: PropTypes.number.isRequired,
          cost: PropTypes.number.isRequired,
          conversionValue: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Ads;
