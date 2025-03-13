import React from 'react'
import './viewProjects.scss'
import '../../dashboard.scss'
import { useNavigate } from 'react-router-dom'

const ViewProjectsPage = () => {

  const navigate = useNavigate();
  return (
    <div className='dashboard-content-container'>
      <div className="header">
        <div className="header-title">Projects</div>
        <div className="portolab-btn" onClick={()=>navigate("/dashboard/projects/new")}>New Project</div>
      </div>

      <div className="dashboard-projects-container">
        <span className='empty-data-message'>No data available</span>
      </div>
    </div>
  )
}

export default ViewProjectsPage