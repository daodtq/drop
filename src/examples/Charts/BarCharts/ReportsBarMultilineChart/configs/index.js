/**
=========================================================
* Material Dashboard 2  React - v2.2.0
=========================================================

* Product Page: https://www.egeadcompany.com/product/material-dashboard-react
* Copyright 2023 Dev Egead Company (https://www.egeadcompany.com)

Coded by www.egeadcompany.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

function configs(labels, datasets) {
  const flattenedDatasets = datasets.flatMap((dataset, index) => {
    // Assuming each dataset.data contains [value1, value2] for each label
    return index % 2 ? [
      {
        label: `${dataset.label}`,
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
        backgroundColor: '#49a3f1', // Màu trắng cho cột 1
        data: dataset.data, // Lấy giá trị cột 1
        maxBarThickness: 15,
      }
    ] : [
      {
        label: `${dataset.label}`,
        tension: 0.4,
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
        backgroundColor: 'rgba(255, 255, 255, 1)', // Màu đen cho cột 2
        data: dataset.data, // Lấy giá trị cột 2
        maxBarThickness: 15,
      }]
  });
  return {
    data: {
      labels,
      datasets: flattenedDatasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
          position: 'top',
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: "rgba(255, 255, 255, .2)",
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 500,
            beginAtZero: true,
            padding: 10,
            font: {
              size: 14,
              weight: 300,
              family: "Roboto",
              style: "normal",
              lineHeight: 2,
            },
            color: "#fff",
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: "rgba(255, 255, 255, .2)",
          },
          ticks: {
            display: true,
            color: "#f8f9fa",
            padding: 10,
            font: {
              size: 14,
              weight: 300,
              family: "Roboto",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
      },
    },
  };
}

export default configs;
