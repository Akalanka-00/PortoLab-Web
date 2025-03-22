import React, { useEffect, useState } from 'react'
import './viewProjects.scss'
import '../../dashboard.scss'
import { useNavigate } from 'react-router-dom'
import { ProjectAPI } from '../../../../api/project/project.api'
import { SlOptionsVertical } from "react-icons/sl";
import Swal from 'sweetalert2'

const ViewProjectsPage = () => {

  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);  // State to store the projects
  const [loading, setLoading] = useState(true);  // State for loading indicator
  const [error, setError] = useState(null);
  const [optionIndex, setOptionIndex] = useState(-1);
  const [isDeleteInProgress, setIsDeleteInProgress] = useState(false);

  const projectAPI = new ProjectAPI();

  const handleOptionClick = (event, index) => {
    event.stopPropagation();
    if (optionIndex === index) {
      setOptionIndex(-1);
    } else {
      setOptionIndex(index);
    }
  };

  const handleProjectStatusChange = async (id, status) => {
    status = status === "active" ? "private" : "active";
    try {
      const response = await projectAPI.updateProjectStatus(id, status);
      if (response) {
        setOptionIndex(-1);
        Swal.fire({
          title: "Success!",
          text: "Project status updated successfully.",
          icon: "success"
        });
        const updatedProjects = projects.map(project => {
          if (project.id === id) {
            return { ...project, status };
          }
          return project;
        });
        setProjects(updatedProjects);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    setIsDeleteInProgress(true);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await projectAPI.deleteProject(projectId);
          
            setProjects(projects.filter(project => project.id !== projectId));
            Swal.fire({
              title: "Deleted!",
              text: "Your project has been deleted.",
              icon: "success"
            }).then(async (result) => {
              if (result.isConfirmed)
              setIsDeleteInProgress(false);
            });
          
        } catch (error) {
          console.log(error);
        }
        
        
      }
    });

    
  };
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.project-options')) {
        setOptionIndex(-1);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


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
            <div className="project-view-card" key={idx} onClick={() => navigate(`/dashboard/projects/view/${project.id}`)}>
              <div className="project-view-card-header">
              <div className="project-view-card-title">{project.title} <span className={`project-${project.status}`}>{project.status}</span></div>

                <div className="project-options">
                  <SlOptionsVertical  onClick={(e) => handleOptionClick(e, idx)}/>
                  {optionIndex === idx && (
                    <div className="project-options-dropdown">
                      <div className="project-option" onClick={() => navigate(`/dashboard/projects/edit/${project.id}`)}>Edit</div>
                      <div className="project-option" onClick={(e)=> {e.stopPropagation(); handleDeleteProject(project.id)}}>Delete</div>
                      <div className="project-option" onClick={(e)=>{e.stopPropagation();handleProjectStatusChange(project.id, project.status)}}>{project.status=="active"? "Make it private":"Make it public"}</div>
                    </div>
                  )}
                </div>
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