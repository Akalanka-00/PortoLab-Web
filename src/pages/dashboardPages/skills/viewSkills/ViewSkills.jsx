import React from 'react'
import { useNavigate } from 'react-router-dom';

const ViewSkillsPage = () => {
    const navigate = useNavigate();
    return (
      <div className='dashboard-content-container'>
        <div className="header">
          <div className="header-title">Skills</div>
          <div className="portolab-btn" onClick={()=>navigate("/dashboard/skills/new")}>New Skill</div>
        </div>
  
        <div className="dashboard-projects-container">
          <span className='empty-data-message'>No data available</span>
        </div>
      </div>
    )
}

export default ViewSkillsPage