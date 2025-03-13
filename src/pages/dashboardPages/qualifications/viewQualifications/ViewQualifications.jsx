import React from 'react'
import './viewQualifications.scss'
import '../../dashboard.scss'
import { useNavigate } from 'react-router-dom'

const ViewQualificationsPage = () => {

  const navigate = useNavigate();
  return (
    <div className='dashboard-content-container'>
      <div className="header">
        <div className="header-title">Work Experiences</div>
        <div className="portolab-btn" onClick={()=>navigate("/dashboard/qualifications/work/new")}>New work experience</div>
      </div>

      <div className="dashboard-work-exp-container">
        <span className='empty-data-message'>No data available</span>
      </div>



      <div className="header">
        <div className="header-title">Education Qualifications</div>
        <div className="portolab-btn" onClick={()=>navigate("/dashboard/qualifications/education/new")}>New Education</div>
      </div>

      <div className="dashboard-work-exp-container">
        <span className='empty-data-message'>No data available</span>
      </div>
    </div>
  )
}

export default ViewQualificationsPage