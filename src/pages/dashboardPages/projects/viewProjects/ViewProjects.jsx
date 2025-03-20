import React, { useEffect, useState } from 'react'
import './viewProjects.scss'
import '../../dashboard.scss'
import { useNavigate } from 'react-router-dom'
import { ProjectAPI } from '../../../../api/project/project.api'

const ViewProjectsPage = () => {

  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);  // State to store the projects
  const [loading, setLoading] = useState(true);  // State for loading indicator
  const [error, setError] = useState(null);

  const projectAPI = new ProjectAPI();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await projectAPI.getProjects();
        if (projectsData) {
          setProjects(projectsData);  // Set the fetched projects
        }
      } catch (error) {
        console.log(error);
        setError("Error fetching projects!");  // Handle any errors
      } finally {
        setLoading(false);  // Stop loading indicator
      }
    };

    fetchProjects();
  }, []);  // Empty dependency array ensures it runs only once after the first render


  return (
    <div className="dashboard-content-container">
      <div className="header">
        <div className="header-title">Projects</div>
        <div className="portolab-btn" onClick={() => navigate("/dashboard/projects/new")}>
          New Project
        </div>
      </div>

      <div className="dashboard-projects-container">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span className="loading-message">Loading projects...</span>
          </div>
        ) : error ? (
          <span className="empty-data-message">{error}</span>
        ) : projects.length === 0 ? (
          <span className="empty-data-message">No data available</span>
        ) : (
          projects.map((project, idx) => (
            <div className="project-view-card" key={idx}>
              <div className="project-view-card-header">
                <div className="project-view-card-title">{project.title}</div>

              </div>

              <div className="project-view-card-body">
                <img src={project.banner} alt="Project Banner" className="project-view-card-image" />

                <div className="project-view-card-content">
                  <div className="project-view-card-description">{project.description}</div>
                  <div className="project-view-card-technologies">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="project-view-card-technology">{tech}</span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default ViewProjectsPage