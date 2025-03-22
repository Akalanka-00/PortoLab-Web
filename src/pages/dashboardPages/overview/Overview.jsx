import React, { useEffect, useState } from 'react';
import './overview.scss';
import { ApiCallAPI } from '../../../api/overview/apicall.api';
import SparklineChart from '../../../components/charts/sparkLineChart/SparklineChart';

const OverviewPage = () => {
  const [yesterdayData, setYesterdayData] = useState([]); // Store data for yesterday
  const [lastWeekData, setLastWeekData] = useState([]); // Store data for last week
  const [lastMonthData, setLastMonthData] = useState([]); // Store data for last month
  const [error, setError] = useState(null); // Store errors if any
  const apiCallAPI = new ApiCallAPI(); // Create an instance of ApiCallAPI

  // Function to process the data into a numeric array for the chart
const processDataForChart = (range, rawData) => {
  let chartData = [];

  if (range === 'yesterday') {
    chartData = new Array(24).fill(0); 
    rawData.forEach(record => {
      const calledAt = new Date(record.calledAt);  
      const hour = calledAt.getUTCHours();  
      chartData[hour] += 1;
    });
  } else if (range === 'last_week') {
    chartData = new Array(7).fill(0); 

    rawData.forEach((record, index) => {
      const calledAt = new Date(record.calledAt);  

      const dayOfWeek = calledAt.getUTCDay();  
      chartData[dayOfWeek] += 1;
    });
  } else if (range === 'last_month') {
    chartData = new Array(31).fill(0); // 31 days

    rawData.forEach(record => {
      const calledAt = new Date(record.calledAt);  
      const dayOfMonth = calledAt.getUTCDate();  // Using getUTCDate() to get the day of the month (1-31)
      chartData[dayOfMonth - 1] += 1;
    });
  }

  return chartData;
};


  // Fetch data for each time range
  const fetchDataByTimeRange = async (range) => {
    try {
      const fetchedData = await apiCallAPI.getByTimeRange(range);
      if (fetchedData) {
        const chartData = processDataForChart(range, fetchedData);
        if (range === 'yesterday') {
          setYesterdayData(chartData);
        } else if (range === 'last_week') {
          setLastWeekData(chartData);
        } else if (range === 'last_month') {
          setLastMonthData(chartData);
        }
      } else {
        setError('Failed to fetch data');
      }
    } catch (error) {
      setError('Error fetching data');
    }
  };

  useEffect(() => {
    fetchDataByTimeRange('yesterday');
    fetchDataByTimeRange('last_week');
    fetchDataByTimeRange('last_month');
  }, []);

  return (
    <div className="overview-container">
      <h1>Overview Page</h1>
      {error && <div className="error">{error}</div>}

      <div className="charts-row">
        <div className="chart-container">
          <h2>Yesterday</h2>
          <SparklineChart data={yesterdayData} />
        </div>

        <div className="chart-container">
          <h2>Last Week</h2>
          <SparklineChart data={lastWeekData} />
        </div>

        <div className="chart-container">
          <h2>Last Month</h2>
          <SparklineChart data={lastMonthData} />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
