import React, { useEffect, useState } from 'react';
import './viewQualifications.scss';
import '../../dashboard.scss';
import { useNavigate } from 'react-router-dom';
import { EducationAPI } from '../../../../api/qualification/education.api';
import { ExperienceAPI } from '../../../../api/qualification/experience.api';
import { SlOptionsVertical } from "react-icons/sl";
import Swal from 'sweetalert2';

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

  const [expOptionIndex, setExpOptionIndex] = useState(-1);
  const [educationOptionIndex, setEducationOptionIndex] = useState(-1);
  const [isDeleteInProgress, setIsDeleteInProgress] = useState(false);
  const educationApi = new EducationAPI();
  const experienceApi = new ExperienceAPI();

  const handleExpOptionClick = (event, index) => {
    event.stopPropagation();
    setEducationOptionIndex(-1);
    if (expOptionIndex === index) {
      setExpOptionIndex(-1);
    } else {
      setExpOptionIndex(index);
    }
  };

  const handleEducationOptionClick = (event, index) => {
    event.stopPropagation();
    setExpOptionIndex(-1);
    if (educationOptionIndex === index) {
      setEducationOptionIndex(-1);
    } else {
      setEducationOptionIndex(index);
    }
  };

  const handleExpDeletion = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await experienceApi.deleteExperience(id);
          if (response) {
            const updatedExperiences = experiences.filter((exp) => exp.id !== id);
            setExperiences(updatedExperiences);
            Swal.fire("Deleted!", "Experience has been deleted.", "success");
          }
        } catch (error) {
          console.log(error);
          Swal.fire("Error!", "Error deleting experience.", "error");
        }
      }
    });
  };

  const handleExpStatusChange = async (id, status) => {
    status = status === "public" ? "private" : "public";
    try {
      const exp = experiences.find((exp) => exp.id === id);
      exp.status = status;
      const response = await experienceApi.updateExperience(id, exp);
      if (response) {
        setExpOptionIndex(-1);
        Swal.fire({
          title: "Success!",
          text: "Experience status updated successfully.",
          icon: "success",
        });
        const updatedExperiences = experiences.map((exp) => {
          if (exp.id === id) {
            return { ...exp, status };
          }
          return exp;
        });
        setExperiences(updatedExperiences);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEducationDeletion = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await educationApi.deleteEducation(id);
          if (response) {
            const updatedEducationExps = educationExps.filter((exp) => exp.id !== id);
            setEducationExps(updatedEducationExps);
            Swal.fire("Deleted!", "Education qualification has been deleted.", "success");
          }
        } catch (error) {
          console.log(error);
          Swal.fire("Error!", "Error deleting education qualification.", "error");
        }
      }
    });
  };

  const handleEducationStatusChange = async (id, status) => {
    status = status === "public" ? "private" : "public";
    try {
      const exp = educationExps.find((exp) => exp.id === id);
      exp.status = status;
      const response = await educationApi.updateEducation(id, exp);
      if (response) {
        setEducationOptionIndex(-1);
        Swal.fire({
          title: "Success!",
          text: "Education qualification status updated successfully.",
          icon: "success",
        });
        const updatedEducationExps = educationExps.map((exp) => {
          if (exp.id === id) {
            return { ...exp, status };
          }
          return exp;
        });
        setEducationExps(updatedEducationExps);
      }
    } catch (error) {
      console.log(error);
    };
  };

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.project-options')) {
        setEducationOptionIndex(-1);
        setExpOptionIndex(-1);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
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
                <th>Visibility</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp, idx) => (
                <tr key={idx}>
                  <td>{exp.company}</td>
                  <td>{exp.role}</td>
                  <td>{`${getMonthName(exp.startMonth)} of ${exp.startYear}`}</td>
                  <td>{exp.stillWorking ? "Present" : `${getMonthName(exp.endMonth)} of ${exp.endYear}`}</td>
                  <td>{exp.status == "public" ? "Published" : "Private"}</td>
                  <td>{exp.description.length > 100 ? exp.description.slice(0, 50) + "..." : exp.description}</td>
                  <td className='qualification-options'>
                    <SlOptionsVertical onClick={(e) => handleExpOptionClick(e, idx)} />

                    {expOptionIndex === idx && (
                      <div className="qualification-options-dropdown">
                        <div className="qualification-option" onClick={() => navigate(`/dashboard/qualifications/work/view/${exp.id}`)}>View</div>
                        <div className="qualification-option" onClick={() => navigate(`/dashboard/qualifications/work/edit/${exp.id}`)}>Edit</div>
                        <div className="qualification-option" onClick={(e) => { e.stopPropagation(); handleExpDeletion(exp.id) }}>Delete</div>
                        <div className="qualification-option" onClick={(e) => { e.stopPropagation(); handleExpStatusChange(exp.id, exp.status) }}>{exp.status == "public" ? "Make it private" : "Make it public"}</div>
                      </div>
                    )}
                  </td>
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
                <th>Visibility</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {educationExps.map((exp, idx) => (
                <tr key={idx}>
                  <td>{exp.collegeName}</td>
                  <td>{exp.courseName}</td>
                  <td>{exp.status == "public" ? "Published" : "Private"}</td>
                  <td>{`${getMonthName(exp.startMonth)} of ${exp.startYear}`}</td>
                  <td>{`${getMonthName(exp.endMonth)} of ${exp.endYear}`}</td>
                  <td className='qualification-options'>
                    <SlOptionsVertical onClick={(e) => handleEducationOptionClick(e, idx)} />

                    {educationOptionIndex === idx && (
                      <div className="qualification-options-dropdown">
                        <div className="qualification-option" onClick={() => navigate(`/dashboard/qualifications/education/view/${exp.id}`)}>View</div>
                        <div className="qualification-option" onClick={() => navigate(`/dashboard/qualifications/education/edit/${exp.id}`)}>Edit</div>                      <div className="qualification-option" onClick={(e) => { e.stopPropagation(); handleEducationDeletion(exp.id) }}>Delete</div>
                        <div className="qualification-option" onClick={(e) => { e.stopPropagation(); handleEducationStatusChange(exp.id, exp.status) }}>{exp.status == "public" ? "Make it private" : "Make it public"}</div>
                      </div>
                    )}
                  </td>
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
