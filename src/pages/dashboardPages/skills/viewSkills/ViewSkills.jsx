import React, { useEffect, useState } from 'react';
import './viewSkills.scss';
import '../../dashboard.scss';
import { useNavigate } from 'react-router-dom';
import { SlOptionsVertical } from "react-icons/sl";
import Swal from 'sweetalert2';
import { SkillAPI } from '../../../../api/skill/skill.api';
import PlaceHolderImage from '../../../../assets/images/placeholder.jpg';

const ViewSkillsPage = () => {
  const navigate = useNavigate();

  // Skills State
  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState(null);
  const [skillsOptionIndex, setSkillsOptionIndex] = useState(-1);
  
  const skillsApi = new SkillAPI();

  // Fetch Skills Data
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsData = await skillsApi.getSkills();
        if (skillsData) {setSkills(skillsData)};
      } catch (error) {
        console.log(error);
        setSkillsError("Error fetching skills!");
      } finally {
        setSkillsLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const handleSkillsOptionClick = (event, index) => {
    event.stopPropagation();
    setSkillsOptionIndex(skillsOptionIndex === index ? -1 : index);
  };

  const handleSkillDeletion = async (id) => {
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
          const response = await skillsApi.deleteSkill(id);
          if (response) {
            setSkills(skills.filter((skill) => skill.id !== id));
            Swal.fire("Deleted!", "Skill has been deleted.", "success");
          }
        } catch (error) {
          console.log(error);
          Swal.fire("Error!", "Error deleting skill.", "error");
        }
      }
    });
  };

  const handleSkillStatusChange = async (id, status) => {
    status = status === "public" ? "private" : "public";
    try {
      const skill = skills.find((skill) => skill.id === id);
      skill.status = status;
      skill.level = skill.expertLevel;
      const response = await skillsApi.updateSkill(id, skill);
      if (response) {
        setSkillsOptionIndex(-1);
        Swal.fire({
          title: "Success!",
          text: "Skill status updated successfully.",
          icon: "success",
        });
        setSkills(skills.map((skill) => (skill.id === id ? { ...skill, status } : skill)));
      }
    } catch (error) {
      console.log(error);
    }
  };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!event.target.closest('.skill-options')) {
          setSkillsOptionIndex(-1);
        }
      };
  
      document.addEventListener("click", handleClickOutside);
  
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

  return (
    <div className="dashboard-content-container">
      
      {/* Skills Section */}
      <div className="header">
        <div className="header-title">Skills</div>
        <div className="portolab-btn" onClick={() => navigate("/dashboard/skills/new")}>
          Add New Skill
        </div>
      </div>

      <div className="skill-container">
        {skillsLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span className="loading-message">Loading skills...</span>
          </div>
        ) : skillsError ? (
          <span className="empty-data-message">{skillsError}</span>
        ) : skills.length === 0 ? (
          <span className="empty-data-message">No skills data available</span>
        ) : (
          <table className='skill-table'>
            <thead>
              <tr>
                <th></th>
                <th>Skill Name</th>
                <th>Expert Level</th>
                <th>Visibility</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill, idx) => (
                <tr key={idx}>
                  <td><img src= {skill.icon || PlaceHolderImage}/></td>
                  <td>{skill.name}</td>
                  <td>{skill.expertLevel}</td>
                  <td>{skill.status === "public" ? "Published" : "Private"}</td>
                  <td className='skill-options'>
                    <SlOptionsVertical onClick={(e) => handleSkillsOptionClick(e, idx)} />

                    {skillsOptionIndex === idx && (
                      <div className="skill-options-dropdown">
                        <div className="skill-option" onClick={() => navigate(`/dashboard/skills/view/${skill.id}`)}>View</div>
                        <div className="skill-option" onClick={() => navigate(`/dashboard/skills/edit/${skill.id}`)}>Edit</div>
                        <div className="skill-option" onClick={(e) => { e.stopPropagation(); handleSkillDeletion(skill.id) }}>Delete</div>
                        <div className="skill-option" onClick={(e) => { e.stopPropagation(); handleSkillStatusChange(skill.id, skill.status) }}>{skill.status === "public" ? "Make it private" : "Make it public"}</div>
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

export default ViewSkillsPage;
