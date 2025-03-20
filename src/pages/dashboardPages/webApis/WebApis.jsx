import React, { useState } from 'react'
import webApiData from '../../../data/webapi.data'
import './webapis.scss'
import BarChart from '../../../components/charts/barChart/BarChart'
import TokenModal from '../../../components/tokenModal/TokenModal'
const WebApisPage = () => {

  const [show, setShow] = useState(false);

  const handleTokenModal = () => {
    setShow(true);
  };
  return (
    <div className='dashboard-content-container'>
      <div className="header">
        <div className="header-title">Web APIs</div>
      </div>

      <div className="dashboard-webapi-container">
        <div className="api-stats-container">
            {webApiData.map((api, index) => (
              <div key={index} className="api-stat-item">
                <div className="api-stat-chart">
                  <BarChart
                    title={api.title}
                    xAxisLabel={api.xAxisLabel}
                    yAxisLabel={api.yAxisLabel}
                    categories={api.categories}
                    series={api.series}
                  />
                </div>
              </div>
            ))}
        </div>

        <div className="api-configuration-container mt-4">
        <div className="header">
        <div className="api-configuration-header-title">Web API Tokens</div>
        <div className='portolab-btn' onClick={handleTokenModal}>New Token</div>
      </div>
        </div>
      </div>

      <TokenModal show={show} setShow={setShow} />
    </div>
  )
}

export default WebApisPage