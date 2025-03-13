import React from 'react'
import { useNavigate } from 'react-router-dom';

const TestimonialsPage = () => {
    const navigate = useNavigate();
    return (
      <div className='dashboard-content-container'>
        <div className="header">
          <div className="header-title">Testimonials</div>
          {/* <div className="portolab-btn" onClick={()=>navigate("/dashboard/projects/new")}>Send Invitation</div> */}
        </div>
  
        <div className="dashboard-projects-container">
          <span className='empty-data-message'>No data available</span>
        </div>
      </div>
    )
}

export default TestimonialsPage