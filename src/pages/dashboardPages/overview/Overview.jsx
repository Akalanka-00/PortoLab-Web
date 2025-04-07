import React, { use, useEffect, useState } from 'react';
import './overview.scss';
import { ApiCallAPI } from '../../../api/overview/apicall.api';
import SparklineChart from '../../../components/charts/sparkLineChart/SparklineChart';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import BarChart from '../../../components/charts/barChart/BarChart';
import apiDocData from '../../../data/apiDoc.data';
import { IoSchoolOutline  } from "react-icons/io5";
import { MdOutlineBusinessCenter  } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { VscDebugDisconnect } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';

const OverviewPage = () => {
  const navigate = useNavigate();
  const [yesterdayPortfolioVisits, setYesterdayPortfolioVisits] = useState([]);
  const [lastMonthPortfolioVisits, setLastMonthPortfolioVisits] = useState([]);
  const [yesterdayApiCalls, setYesterdayApiCalls] = useState([]);
  const [lastWeekPortfolioVisits, setLastWeekPortfolioVisits] = useState([]);
  const [lastWeekApiCalls, setLastWeekApiCalls] = useState([]);
  const [lastMonthApiCalls, setLastMonthApiCalls] = useState([]);
  const [error, setError] = useState(null);
  const [topCardData, setTopCardData] = useState([]);
  const [totalApiCallsTimeRange, setTotalApiCallsTimeRange] = useState('day');
  const [yesterdayRawData, setYesterdayRawData] = useState([]);
  const [lastWeekRawData, setLastWeekRawData] = useState([]);
  const [lastMonthRawData, setLastMonthRawData] = useState([]);
  const [summary, setSummary] = useState(
    { categories: [], data: [] }
  );


  const shortcutData = [

    {
      title: 'It\'s a new project',
      description: 'Add a new project to your collection',
      icon: <AiOutlineFundProjectionScreen  />,
      url: '/dashboard/projects/new'
    },
    {
      title: 'Just learn something new',
      description: 'Add a new educational experience to your collection',
      icon: <IoSchoolOutline   />,
      url: '/dashboard/qualifications/education/new'
    },

    {
      title: 'I\'ve got a new job',
      description: 'Add a new work experience to your collection',
      icon: <MdOutlineBusinessCenter  ork  />,
      url: '/dashboard/qualifications/work/new'
    },

    {
      title: 'Create a new API token',
      description: 'Create a new API token for your collection',
      icon: <VscDebugDisconnect  />,
      url: '/dashboard/webapi'
    }
  ];
  const apiCallAPI = new ApiCallAPI();

  // Process API data for chart visualization
  const processDataForChart = (range, rawData, filterBy = null) => {
    let filteredData = filterBy ? rawData.filter(record => record.apiName === filterBy) : rawData;
    let chartData = [];
    const now = new Date();

    if (range === 'yesterday') {
      chartData = new Array(24).fill(0);
      const startDate = new Date(now);
      startDate.setHours(startDate.getHours(), 0, 0, 0);
      startDate.setDate(startDate.getDate() - 1);
      for (let i = 0; i < 24; i++) {
        const currentHourDate = new Date(startDate);
        currentHourDate.setHours(startDate.getHours() + i); // Increment hour by i

        filteredData.forEach(record => {
          const apidate = new Date(record.calledAt);
          if (apidate.getHours() === currentHourDate.getHours() && apidate.getDate() === currentHourDate.getDate()) {
            chartData[i] += 1;
          }
        });
      }

    } else if (range === 'last_week') {
      chartData = new Array(7).fill(0);
      const startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 7);
      for (let i = 0; i < 7; i++) {
        const currentWeekDate = new Date(startDate);
        currentWeekDate.setDate(startDate.getDate() + i); // Increment date by i

        filteredData.forEach(record => {
          const apidate = new Date(record.calledAt);
          if (apidate.getDate() === currentWeekDate.getDate() && apidate.getMonth() === currentWeekDate.getMonth()) {
            chartData[i] += 1;
          }
        });
      }
    }

    else if (range === 'last_month') {
      const arrSize = 31;
      chartData = new Array(arrSize).fill(0);
      const startDate = new Date(now);
      startDate.setDate(startDate.getDate() - arrSize);
      for (let i = 0; i < arrSize; i++) {
        const currentMonthDate = new Date(startDate);
        currentMonthDate.setDate(startDate.getDate() + i); // Increment date by i
        // console.log(i, 'currentMonthDate', currentMonthDate);
        filteredData.forEach(record => {
          const apidate = new Date(record.calledAt);
          console.log(`apidate: ${apidate.getDate()} ${apidate.getMonth()}`, `currentMonthDate: ${currentMonthDate.getDate()} ${currentMonthDate.getMonth()}`);
          if (apidate.getDate() === currentMonthDate.getDate() && apidate.getMonth() === currentMonthDate.getMonth()) {
            chartData[i] += 1;
          }
        });
      }

      console.log("\n\n")

      // chartData = new Array(31).fill(0);
      // filteredData.forEach(record => {
      //   const dayOfMonth = new Date(record.calledAt).getUTCDate();
      //   chartData[dayOfMonth - 1] += 1;
      // });
    }
    return chartData;
  };


  // Fetch data and filter for Portfolio Visits & API Calls
  const fetchDataByTimeRange = async (range) => {
    try {
      const fetchedData = await apiCallAPI.getByTimeRange(range);
      if (fetchedData) {
        const portfolioVisits = processDataForChart(range, fetchedData, 'portfolio-visit-api');
        const apiCalls = processDataForChart(range, fetchedData);

        if (range === 'yesterday') {
          setYesterdayPortfolioVisits(portfolioVisits);
          setYesterdayApiCalls(apiCalls);
          setYesterdayRawData(fetchedData);
        } else if (range === 'last_week') {
          setLastWeekPortfolioVisits(portfolioVisits);
          setLastWeekApiCalls(apiCalls);
          setLastWeekRawData(fetchedData);
        }
        else if (range === 'last_month') {
          setLastMonthPortfolioVisits(portfolioVisits);
          setLastMonthApiCalls(apiCalls);
          setLastMonthRawData(fetchedData);
        }
      } else {
        setError('Failed to fetch data');
      }
    } catch (error) {
      setError('Error fetching data');
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDataByTimeRange('yesterday');
    fetchDataByTimeRange('last_week');
    fetchDataByTimeRange('last_month');
  }, []);

  // Update Top Card Data whenever state updates
  useEffect(() => {
    setTopCardData([
      {
        title: 'Last 24h Portfolio Visits',
        value: yesterdayPortfolioVisits.length > 0 ? yesterdayPortfolioVisits[yesterdayPortfolioVisits.length - 1] : 0,
        total: yesterdayPortfolioVisits.reduce((a, b) => a + b, 0),
        data: yesterdayPortfolioVisits,
        efficiency:
          (((yesterdayPortfolioVisits[yesterdayPortfolioVisits.length - 1] - yesterdayPortfolioVisits[0]) /
            yesterdayPortfolioVisits.reduce((a, b) => a + b, 0)) *
            100
          ).toFixed(0)
        ,
      },
      {
        title: 'Last Month Portfolio Visits',
        value: lastMonthPortfolioVisits.length > 0 ? lastMonthPortfolioVisits[lastMonthPortfolioVisits.length - 1] : 0,
        total: lastMonthPortfolioVisits.reduce((a, b) => a + b, 0),
        data: lastMonthPortfolioVisits,
        efficiency:
          (((lastMonthPortfolioVisits[lastMonthPortfolioVisits.length - 1] - lastMonthPortfolioVisits[0]) /
            lastMonthPortfolioVisits.reduce((a, b) => a + b, 0)) *
            100
          ).toFixed(0)

      },
      {
        title: 'Last 24h Total API Calls',
        value: yesterdayApiCalls.length > 0 ? yesterdayApiCalls[yesterdayApiCalls.length - 1] : 0,
        total: yesterdayApiCalls.reduce((a, b) => a + b, 0),
        data: yesterdayApiCalls,
        efficiency:
          (((yesterdayApiCalls[yesterdayApiCalls.length - 1] - yesterdayApiCalls[0]) / yesterdayApiCalls.reduce((a, b) => a + b, 0)) * 100).toFixed(0)

      },
      {
        title: 'Last Month API Calls',
        value: lastMonthApiCalls.length > 0 ? lastMonthApiCalls[lastMonthApiCalls.length - 1] : 0,
        total: lastMonthApiCalls.reduce((a, b) => a + b, 0),
        data: lastMonthApiCalls,
        efficiency:
          (((lastMonthApiCalls[lastMonthApiCalls.length - 1] - lastMonthApiCalls[0]) / lastMonthApiCalls.reduce((a, b) => a + b, 0)) * 100).toFixed(0)
        ,
      },
    ]);
  }, [yesterdayPortfolioVisits, lastMonthPortfolioVisits, yesterdayApiCalls, lastMonthApiCalls]);

  useEffect(() => {
    if (yesterdayRawData.length > 0) {
      const apiNames = [...new Set(yesterdayRawData.map(item => item.apiName))];
      const data = apiNames.map(apiName =>
        yesterdayRawData.filter(item => item.apiName === apiName).length
      );
      const categories = apiNames.map(apiName => apiName = apiDocData.find(item => item.name === apiName).title);


      setSummary({ categories, data }); // Properly updating state
    }
  }, [yesterdayRawData]);

  const totalApiCallsTimeRangeHandler = (event) => {
    const timeRange = event.target.value;
    console.log('Time Range:', timeRange);

    let apiCallData = [];
    switch (timeRange) {
      case 'day':
        apiCallData = yesterdayRawData;
        break;
      case 'week':
        apiCallData = lastWeekRawData;
        break;
      case 'month':
        apiCallData = lastMonthRawData;
        break;
      default:
        apiCallData = yesterdayRawData;
    }

    if (apiCallData.length > 0) {
      const apiNames = [...new Set(apiCallData.map(item => item.apiName))];
      const data = apiNames.map(apiName =>
        apiCallData.filter(item => item.apiName === apiName).length
      );
      const categories = apiNames.map(apiName => apiName = apiDocData.find(item => item.name === apiName).title);


      setSummary({ categories, data });
    }
    setTotalApiCallsTimeRange(timeRange);
  };


  return (
    <div className="overview-container">
      {error && <div className="error">{error}</div>}

      <div className="top-cards-container">
        {topCardData.map((data, index) => {
          console.log(data);
          const status = data.efficiency > 0;
          if (data.total > 0) {
            return (
              <div key={index} className="top-card">
                <div className="header">
                  <div className="card-title">{data.title}</div>
                </div>
                <div className="content">
                  <div className="values">
                    <div className="value">{data.value}</div>
                    <div className="total">
                      Total: <span>{data.total}</span>
                    </div>
                  </div>

                  <div className="chart">
                    <SparklineChart data={data.data} />
                  </div>
                </div>
                <div className="footer">
                  <div className="trend-icon">
                    {status ? <FaArrowTrendUp className="trend-up" /> : <FaArrowTrendDown className="trend-down" />}
                  </div>
                  <div className={`efficiency ${status ? 'trend-up' : 'trend-down'}`}>
                    {data.efficiency}% <span>than last period</span>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className="top-card">
                <div className="header">
                  <div className="card-title">{data.title}</div>
                </div>
                <div className="content">
                  <div className="no-data-top-card"><span>No data available</span></div>
                </div>

              </div>
            );
          }
        })}
      </div>
      <div className="second-cards-container">
        <div className="summary-views">
          <div className="header">
            <div className="header-name">
              <div className="chart-title">Total API calls</div>
            </div>
            <select name='time-duratin' id='time-duratin' className="header-filter" onChange={totalApiCallsTimeRangeHandler} value={totalApiCallsTimeRange}>
              <option value="day">Today</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>

          <div className="api-summary-container">
            <BarChart categories={summary.categories} data={summary.data} />
          </div>
        </div>

        <div className="dashboard-shortcuts">
          <div className="header">
            <div className="header-title">Quick Actions</div>
          </div>
          <div className="shortcuts-container">

            {shortcutData.map((data, index) => {
              return (
                <div key={index} className="shortcut" onClick={()=>navigate(data.url)}>
                  <div className="shortcut-icon">
                    {data.icon}
                  </div>
                  <div className="shortcut-content">
                    <div className="shortcut-title">{data.title}</div>
                    {/* <div className="shortcut-description">{data.description}</div> */}
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>

    </div>
  );
};

export default OverviewPage;
