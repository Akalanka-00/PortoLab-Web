import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const SparklineChart = ({ data }) => {
  const options = {
    chart: {
      type: "spline",
      backgroundColor: "transparent",
      height: 50, // Adjust height to make it a sparkline
    },
    title: {
      text: null, // Remove title for minimal UI
    },
    xAxis: {
      labels: { enabled: false },
      lineWidth: 0,
      tickWidth: 0,
    },
    yAxis: {
      labels: { enabled: false },
      gridLineWidth: 0,
      title: { text: null },
    },
    
    series: [
      {
        data: data, // Accepting data as props
        color: data[data.length - 1] > data[0] ? "#2ecc71" : "#F44336",
        lineWidth: 2,
        marker: { enabled: false },
      },
    ],
    tooltip: {
      enabled: false, // Disable tooltip for sparkline
    },
    credits: {
      enabled: false, // Hide Highcharts watermark
    },
    legend: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SparklineChart;
