import React, { useEffect, useState } from 'react'
import { ApiCallAPI } from '../../../api/overview/apicall.api';
import './overview.scss'
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";
import Growth from "../../../assets/images/growth.png";
import SparklineChart from '../../../components/charts/sparkLineChart/SparklineChart';
import LineChart from '../../../components/charts/lineChart/LineChart';
import PieChart from '../../../components/charts/pieChart/PieChart';
import Aos from 'aos';
import apiDocData from '../../../data/apiDoc.data';
const OverviewPage = () => {
  const apiCallAPI = new ApiCallAPI();
  const [fetchedData, setFetchedData] = useState({ today_data: [], last_week_data: [], last_month_data: [] });

  const fetchDataByTimeRange = async () => {
    const fetchedData_today = await apiCallAPI.getByTimeRange('yesterday');
    const fetchedData_last_week = await apiCallAPI.getByTimeRange('last_week');
    const fetchedData_last_month = await apiCallAPI.getByTimeRange('last_month');
    const data = { today_data: labelizeFetchedData(fetchedData_today), last_week_data: labelizeFetchedData(fetchedData_last_week), last_month_data: labelizeFetchedData(fetchedData_last_month) };
    const mocData = generateTimeBasedData();
    const finalizedData = {
      today_data: [...mocData.today_data, ...fetchedData_today].sort((a, b) => new Date(b.calledAt) - new Date(a.calledAt)),
      last_week_data: [...mocData.last_week_data, ...fetchedData_last_week].sort((a, b) => new Date(b.calledAt) - new Date(a.calledAt)),
      last_month_data: [...mocData.last_month_data, ...fetchedData_last_month].sort((a, b) => new Date(b.calledAt) - new Date(a.calledAt))
    };
    console.log(finalizedData);
    setFetchedData(finalizedData);
  }

  const labelizeFetchedData = (data) => {
    data.forEach((item) => {
      item.status = true;
    });
    return data;
  }

  function generateTimeBasedData() {
    const now = new Date();
    const today_data = [];
    const last_week_data = [];
    const last_month_data = [];

    for (let i = 0; i < 24; i++) {
      const date = new Date(now.setHours(now.getHours() - i));
      today_data.push({ calledAt: date.toISOString(), apiName: "moc-api", status: false, deviceType: null });
    }

    for (let i = 0; i < 7; i++) {
      const date = new Date(now.setDate(now.getDate() - i));
      last_week_data.push({ calledAt: date.toISOString(), apiName: "moc-api", status: false, deviceType: null });
    }

    for (let i = 0; i < 30; i++) {
      const date = new Date(now.setDate(now.getDate() - i));
      last_month_data.push({ calledAt: date.toISOString(), apiName: "moc-api", status: false, deviceType: null });
    }

    return {
      today_data: today_data,
      last_week_data: last_week_data,
      last_month_data: last_month_data,
    }

  }


  const calculateTodayGap = (data) => {
    if (data.length === 0) {
      return 0;
    }
    data.sort((a, b) => new Date(a.calledAt) - new Date(b.calledAt));
    const firstDate = new Date(data[0].calledAt);
    const lastDate = new Date(data[data.length - 1].calledAt);
    let firstDataCount = 0;
    let lastDataCount = 0;
    data.forEach((item) => {
      if (new Date(item.calledAt).getHours() === firstDate.getHours() && new Date(item.calledAt).getDate() === firstDate.getDate()) {
        firstDataCount++;
      }
      if (new Date(item.calledAt).getHours() === lastDate.getHours() && new Date(item.calledAt).getDate() === lastDate.getDate()) {
        lastDataCount++;
      }
    });

    const gap = lastDataCount - firstDataCount;
    return gap;

  }

  const generateSparklineTodayData = (data) => {
    const sparklineData = [];
    const today = new Date();
    for (let i = 0; i < 24; i++) {
      const date = new Date(today.setHours(today.getHours() - i));
      const filteredData = data.filter(item => new Date(item.calledAt).getHours() === date.getHours() && new Date(item.calledAt).getDate() === date.getDate() && item.status == true && item.apiName === "portfolio-visit-api");
      const count = filteredData.length;
      sparklineData.push(count);
    }
    sparklineData.reverse();
    return sparklineData;

  }

  const transformDataToChartFormat = (range = "today") => {
    const categories = [];
    const seriesData = [];
    const data = range === "today" ? fetchedData.today_data : range === "last_week" ? fetchedData.last_week_data : fetchedData.last_month_data;
    const deviceTypes = [...new Set(data.map(record => record.deviceType).filter(deviceType => deviceType != null))];
    const series = deviceTypes.map(deviceType => ({
      name: deviceType,
      data: new Array(range === "today" ? 24 : range === "last_week" ? 7 : 30).fill(0),
      colors: []
    }));

    if (range === "today") {
      for (let i = 0; i < 24; i++) {
        const date = new Date();
        date.setHours(date.getHours() - i);
        categories.push(`${date.getHours()}:00`);
        series.forEach((deviceType) => {
          const filteredData = data.filter(record => new Date(record.calledAt).getHours() === date.getHours() && new Date(record.calledAt).getDate() === date.getDate() && record.deviceType === deviceType.name && record.status === true);
          deviceType.data[i] = filteredData.length;
        });
      }
    } else if (range === "last_week") {
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setHours(date.getDate() - i);
        categories.push(`${date.getDate()}-${date.getMonth() + 1}`);
        series.forEach((deviceType) => {
          const filteredData = data.filter(record => new Date(record.calledAt).getDate() === date.getDate() && new Date(record.calledAt).getMonth() === date.getMonth() && record.deviceType === deviceType.name && record.status === true);
          deviceType.data[i] = filteredData.length;
        });
      }
    }

    else if (range === "last_month") {
      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setHours(date.getDate() - i);
        categories.push(`${date.getDate()}-${date.getMonth() + 1}`);
        series.forEach((deviceType) => {
          const filteredData = data.filter(record => new Date(record.calledAt).getDate() === date.getDate() && new Date(record.calledAt).getMonth() === date.getMonth() && record.deviceType === deviceType.name && record.status === true);
          deviceType.data[i] = filteredData.length;
        });
      }
    }
    categories.reverse();
    series.forEach((deviceType) => {
      deviceType.data = deviceType.data.reverse();

    });
    console.log(categories, series);
    return {
      categories,
      seriesData: series
    }
  };

  const transformDataToPieFormat = (range = "today") => {

    const data = range === "today" ? fetchedData.today_data : range === "last_week" ? fetchedData.last_week_data : fetchedData.last_month_data;
    const apiTypes = [...new Set(data.map(record => record.apiName).filter(apiName => apiName != null && apiName !== "moc-api"))];
    const series = apiTypes.map(apiName => ({
      name: apiDocData.find(api => api.name === apiName)?.title || apiName,
      y: data.filter(record => record.apiName === apiName && record.status === true).length,
    }));
    return series;
  };



  useEffect(() => {
    fetchDataByTimeRange();
    Aos.init();
    Aos.refresh();
  }, []);
  return (
    <div className='dashboard-overview-container'>
      <div className="overview-cards">

        <div className="portfolio-visit-container" data-aos="flip-left" data-aos-duration="1000">
          <div className="portfolio-visit-content">

            <div className="portfolio-visit-left-content">
              <div className="portfolio-visit-title">
                How Many People Found You in last 24 Hours
              </div>

              <div className="portfolio-vsit-data-container">
                <div className="portfolio-visit-data">
                  <div className="visit-value">{fetchedData.today_data.filter(data => data.apiName === "portfolio-visit-api" && data.status === true).length} <span>{calculateTodayGap(fetchedData.today_data.filter(data => data.apiName === "portfolio-visit-api" && data.status === true)) >= 0 ? <IoMdTrendingUp /> : <IoMdTrendingDown />}</span></div>
                  <div className="visit-title">Users visit your portfolio</div>
                </div>

                <div className="portfolio-visit-data">
                  <div className="visit-value">
                    {[
                      ...new Set(
                        fetchedData.today_data
                          .filter(data => data.apiName === "portfolio-visit-api" && data.status === true)
                          .map(data => data.deviceId)
                      )
                    ].length}
                    <span>
                      {calculateTodayGap(
                        fetchedData.today_data.filter(data => data.apiName === "portfolio-visit-api" && data.status === true)
                      ) >= 0 ? (
                        <IoMdTrendingUp />
                      ) : (
                        <IoMdTrendingDown />
                      )}
                    </span>
                  </div>
                  <div className="visit-title">New Users visit your portfolio</div>
                </div>
              </div>

            </div>
            <div className="portfolio-visit-right-content">
              <img src={Growth} alt="growth" />
            </div>


          </div>


        </div>

        <div className="portfolio-growth-card">
          <div className="portfolio-growth-title">Portfolio Growth in Last 24h</div>
          <div className="portfolio-growth-data">
            <SparklineChart data={generateSparklineTodayData(fetchedData.today_data)} />
          </div>
        </div>
      </div>
      <div className="overview-chart-container">
        <div className="device-type-chart-container">
          <div className="overview-chart-title">Overview Chart</div>
          <div className="overview-chart-data">
            <LineChart data={transformDataToChartFormat("today")} />
          </div>
        </div>

        <div className="api-request-type-container">
          <div className="overview-chart-title">Last 24h API Usage Summary</div>
          <div className="overview-chart-data">
            <PieChart
              title=""
              subtitle=""
              data={transformDataToPieFormat("today")}
            />
          </div>
        </div>
      </div>

    </div>
  )
}

export default OverviewPage