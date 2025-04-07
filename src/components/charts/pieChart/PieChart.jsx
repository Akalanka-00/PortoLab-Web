import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Fan animation extension for Highcharts Pie
(function (H) {
  H.seriesTypes.pie.prototype.animate = function (init) {
    const series = this,
      chart = series.chart,
      points = series.points,
      { animation } = series.options,
      { startAngleRad } = series;

    function fanAnimate(point, startAngleRad) {
      const graphic = point.graphic,
        args = point.shapeArgs;

      if (graphic && args) {
        graphic
          .attr({
            start: startAngleRad,
            end: startAngleRad,
            opacity: 1
          })
          .animate(
            {
              start: args.start,
              end: args.end
            },
            {
              duration: animation.duration / points.length
            },
            function () {
              if (points[point.index + 1]) {
                fanAnimate(points[point.index + 1], args.end);
              }
              if (point.index === series.points.length - 1) {
                series.dataLabelsGroup?.animate(
                  { opacity: 1 },
                  void 0,
                  function () {
                    points.forEach(point => {
                      point.opacity = 1;
                    });
                    series.update({ enableMouseTracking: true }, false);
                    chart.update({
                      plotOptions: {
                        pie: {
                          innerSize: '40%',
                          borderRadius: 8
                        }
                      }
                    });
                  }
                );
              }
            }
          );
      }
    }

    if (init) {
      points.forEach(point => {
        point.opacity = 0;
      });
    } else if (points.length > 0) {
      fanAnimate(points[0], startAngleRad);
    }
  };
})(Highcharts);

// React Component
const PieChart = ({ title = "API Usage Summary", subtitle = "By percentage", data }) => {
  const isDataAvailable = Array.isArray(data) && data.length > 0;

  if (!isDataAvailable) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", fontWeight: "bold", color: "#999" }}>
        No data available
      </div>
    );
  }

  const options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent"
    },
    title: {
      text: title,
      style: { color: "var(--color-dark)", fontWeight: "bold" }
    },
    subtitle: {
      text: subtitle,
      style: { color: "var(--color-dark)" }
    },
    tooltip: {
      headerFormat: "",
      pointFormat:
        '<span style="color:{point.color}">\u25cf</span> {point.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: "%"
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        borderWidth: 2,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<span>{point.name}</span><br>{point.percentage:.1f}%",
          distance: 20,
          style: { color: "var(--color-dark)", fontWeight: "600" }
        }
      }
    },
    series: [
      {
        enableMouseTracking: false,
        animation: {
          duration: 2000
        },
        colorByPoint: true,
        data: data
      }
    ],
    credits: {
      enabled: false
    }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
