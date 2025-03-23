import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarChart = ({ categories, data }) => {

  // Check if all data values are 0
  const isDataEmpty = data.every(value => value === 0);

  if (isDataEmpty) {
    return <div style={{ textAlign: "center", fontSize: "16px", color: "var(--color-dark)" }}>No data available</div>;
  }

  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "var(--color-dark)", // Updated text color
        },
      },
      gridLineWidth: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "var(--color-dark)", // Updated text color
        },
      },
      gridLineColor: "var(--seperator)",
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        borderRadius: 5,
        pointPadding: 0.2,
        groupPadding: 0.1,
      },
    },
    tooltip: {
      useHTML: true,
      backgroundColor: "var(--color-white)",  // Updated background color
      borderRadius: 8,
      style: {
        color: "var(--color-dark)", // Text color
      },
      formatter: function () {
        return `<b style="color: var(--color-dark)">${this.category}</b><br>
          <span style="color:${this.point.color}">●</span> <b style="color: var(--color-dark)">No. of API calls:</b> 
          <span style="color: var(--color-dark)">${this.y}</span>`;
      },
    },
    
    series: [
      {
        name: "Data",
        data: data.map((value, index) => ({
          y: value,
          color: index === 2 ? "#007bff" : index % 2 === 0 ? "#a3e4d7" : "#f5b7b1",
        })),
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
