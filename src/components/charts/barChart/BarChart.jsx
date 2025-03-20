import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./barChart.scss"; // Import the SCSS file

const BarChart = ({ title, xAxisLabel, yAxisLabel, categories, series }) => {
    const options = {
        chart: {
          type: "column",
          backgroundColor: "transparent",
        },
        title: {
          text: title,
        },
        xAxis: {
          categories: categories,
          title: {
            text: xAxisLabel,
          },
          gridLineWidth: 0,
          lineWidth: 0,
        },
        yAxis: {
          min: 0,
          title: {
            text: yAxisLabel,
            align: "high",
          },
          labels: {
            overflow: "justify",
          },
          gridLineWidth: 0,
        },
        tooltip: {
          enabled: true, // 🔴 Disable tooltip
        },
        plotOptions: {
          column: {
            borderRadius: 5,
            dataLabels: {
              enabled: false, // 🔴 Disable data labels globally
            },
            groupPadding: 0.1,
          },
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor: Highcharts.defaultOptions.legend?.backgroundColor || "#FFFFFF",
          shadow: true,
        },
        credits: {
          enabled: false,
        },
        series: series.map(s => ({
          ...s,
          dataLabels: {
            enabled: false, // 🔴 Ensure no labels on bars
          },
          showInLegend: false, // Optional: Hide legend
        })),
      };
      

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
