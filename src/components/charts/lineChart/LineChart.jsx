import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./lineChart.scss";
const LineChart = ({ data }) => {

  // Check if all data values are 0
  const {categories, seriesData} = data;
  if(!seriesData) {
    return <div style={{ textAlign: "center", fontSize: "16px", color: "var(--color-dark)" }}>No series available</div>;
  }
  const isDataEmpty = seriesData.every(series => series.data.every(value => value === 0));

  if (isDataEmpty) {
    return <div style={{ textAlign: "center", fontSize: "16px", color: "var(--color-dark)" }}>No data available</div>;
  }

  const options = {
    chart: {
      type: "line",
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
        enabled: true,
        align: "center",
        verticalAlign: "top",
        layout: "horizontal",
        itemStyle: {
          color: "var(--color-dark)", // Set legend label color
          fontWeight: "bold",
          fontSize: "14px",
        },
      },
      
    plotOptions: {
      line: {
        marker: {
          enabled: true,
          radius: 4,
        },
        lineWidth: 3,
        states: {
          hover: {
            lineWidth: 4,
          },
        },
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
        return `<b style="color: var(--color-dark)">${this.series.name}</b><br>
                <span style="color: var(--color-dark)">Date:</span> ${this.x}<br>
                <span style="color: var(--color-dark)">Value:</span> ${this.y}`;
      },
    },
    
    series: seriesData.map((series) => ({
      name: series.name,
      data: series.data.map((value, index) => ({
        y: value,
        color: series.colors ? series.colors[index] : (index % 2 === 0 ? "#FF0060" : "#1B9C85"),
      })),
    })),
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
