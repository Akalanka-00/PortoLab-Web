import React, { useEffect, useState } from 'react';
import './viewQualifications.scss';
import '../../dashboard.scss';
import { useNavigate } from 'react-router-dom';
import { EducationAPI } from '../../../../api/qualification/education.api';
import { ExperienceAPI } from '../../../../api/qualification/experience.api';

const ViewQualificationsPage = () => {
  const navigate = useNavigate();
  
  // Education State
  const [educationExps, setEducationExps] = useState([]);  
  const [educationExpLoading, setEducationExpLoading] = useState(true);
  const [educationError, setEducationError] = useState(null);

  // Experience State
  const [experiences, setExperiences] = useState([]);  
  const [expLoading, setExpLoading] = useState(true);
  const [expError, setExpError] = useState(null);

  const educationApi = new EducationAPI();
  const experienceApi = new ExperienceAPI();

  useEffect(() => {
    const fetchEducationExps = async () => {
      try {
        const educationData = await educationApi.getEducationExps();
        if (educationData) setEducationExps(educationData);
      } catch (error) {
        console.log(error);
        setEducationError("Error fetching education qualifications!");
      } finally {
        setEducationExpLoading(false);
      }
    };

    const fetchExperiences = async () => {
      try {
        const experienceData = await experienceApi.getExperienceExps();
        if (experienceData) setExperiences(experienceData);
      } catch (error) {
        console.log(error);
        setExpError("Error fetching experiences!");
      } finally {
        setExpLoading(false);
      }
    };

    fetchEducationExps();
    fetchExperiences();
  }, []);

  function getMonthName(monthNumber) {
    return new Date(2000, monthNumber - 1).toLocaleString('en-US', { month: 'long' });
}

  return (
    <div className="dashboard-content-container">
      {/* Work Experience Section */}
      <div className="header">
        <div className="header-title">Work Experiences</div>
        <div className="portolab-btn" onClick={() => navigate("/dashboard/qualifications/work/new")}>
          New Work Experience
        </div>
      </div>

      <div className="qualification-container">
        {expLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span className="loading-message">Loading experiences...</span>
          </div>
        ) : expError ? (
          <span className="empty-data-message">{expError}</span>
        ) : experiences.length === 0 ? (
          <span className="empty-data-message">No experience data available</span>
        ) : (
            <table className='qualification-table'>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((exp, idx) => (
                  <tr key={idx}>
                    <td>{exp.company}</td>
                    <td>{exp.role}</td>
                    <td>{`${getMonthName(exp.startMonth)} of ${exp.startYear}`}</td>
                    <td>{exp.isStillWorking ? "Present" : `${getMonthName(exp.endMonth)} of ${exp.endYear}`}</td>
                    <td>{exp.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        )}
      </div>

      {/* Education Section */}
      <div className="header">
        <div className="header-title">Education Qualifications</div>
        <div className="portolab-btn" onClick={() => navigate("/dashboard/qualifications/education/new")}>
          New Education
        </div>
      </div>

      <div className="qualification-container">
        {educationExpLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span className="loading-message">Loading education qualifications...</span>
          </div>
        ) : educationError ? (
          <span className="empty-data-message">{educationError}</span>
        ) : educationExps.length === 0 ? (
          <span className="empty-data-message">No education data available</span>
        ) : (
            <table className='qualification-table'>
              <thead>
                <tr>
                  <th>College</th>
                  <th>Course</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {educationExps.map((exp, idx) => (
                  <tr key={idx}>
                    <td>{exp.collegeName}</td>
                    <td>{exp.courseName}</td>
                    <td>{`${getMonthName(exp.startMonth)} of ${exp.startYear}`}</td>
                    <td>{`${getMonthName(exp.endMonth)} of ${exp.endYear}`}</td>                    
                  </tr>
                ))}
              </tbody>
            </table>
        )}
      </div>
    </div>
  );
};

export default ViewQualificationsPage;
