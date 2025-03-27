function configs(labels, datasets) {
  return {
    data: {
      labels,
      datasets: datasets.map(dataset => ({
        label: dataset.label,
        tension: 0,
        pointRadius: 5,
        pointBorderColor: "transparent",
        pointBackgroundColor: "rgba(255, 255, 255, .8)",
        borderColor: dataset.borderColor || "rgba(255, 255, 255, .8)",
        borderWidth: 4,
        backgroundColor: dataset.backgroundColor || "transparent",
        fill: true,
        data: dataset.data,
        maxBarThickness: 6,
      })),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, 
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
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [5, 5],
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
