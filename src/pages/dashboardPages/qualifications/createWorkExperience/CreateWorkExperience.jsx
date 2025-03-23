import React, { useEffect, useState } from 'react';
import './createWorkExperience.scss';
import '../../dashboard.scss';
import { ExperienceAPI } from '../../../../api/qualification/experience.api';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateWorkExperiencePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    startYear: new Date().getFullYear(),
    startMonth: 1,
    endYear: new Date().getFullYear(),
    endMonth: 1,
    isStillWorking: false,
    description: '',
  });
  const [experience, setExperience] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams(); // Get ID from URL if available
  const location = useLocation();
  const isEditMode = location.pathname.includes('/edit/');
  const isViewMode = location.pathname.includes('/view/');

  const workExperienceApi = new ExperienceAPI();

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;

    // Handle checkbox input separately
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [id]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      company: '',
      role: '',
      startYear: new Date().getFullYear(),
      startMonth: 1,
      endYear: new Date().getFullYear(),
      endMonth: 1,
      isStillWorking: false,
      description: '',
    });
  };

  const handleCreate = async () => {
    console.log('Work Experience Data:', formData);
    if(isEditMode){
      const response = await workExperienceApi.updateExperience(id, formData);
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Work Experience updated successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/dashboard/qualifications');
      }
    }
    else if(isViewMode){
      navigate(`/dashboard/qualifications/work/edit/${id}`);

    }
    else{
      const response = await workExperienceApi.createExperience(formData);
    if(response){
      Swal.fire({
        icon: 'success',
        position: 'top-end',
        title: 'Work Experience created successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/dashboard/qualifications');
    }
    }
  };

  const fetchExperience = async () => {
    const response = await workExperienceApi.getExperienceById(id);
    if (response) {
      setExperience(response);
      console.log('Experience:', response);
      setFormData({
        company: response.company,
        role: response.role,
        startYear: response.startYear,
        startMonth: response.startMonth,
        endYear: response.endYear,
        endMonth: response.endMonth,
        isStillWorking: response.stillWorking,
        description: response.description,
        status: response.status,
      });

    }
  };

    useEffect(() => {
      if (isEditMode || isViewMode) {
        fetchExperience();
      }
    }, [id]);

  return (
    <div className="dashboard-content-container">
      <div className="header">
        <div className="header-title">Add new Work Experience</div>
      </div>
      <div className="work-exp-container">
        <div className="work-exp-form-container">
          <div className="new-work-exp-form">
            <div className="form-group">
              <label htmlFor="company" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                className="form-input"
                id="company"
                value={formData.company}
                onChange={handleChange}
                disabled={isViewMode}
                placeholder="Company Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <input
                type="text"
                className="form-input"
                id="role"
                value={formData.role}
                onChange={handleChange}
                disabled={isViewMode}
                placeholder="Role"
              />
            </div>

            <div className="form-group">
              <div className="form-sub-group">
                <label htmlFor="startYear" className="form-label">
                  Start Year
                </label>
                <select
                  id="startYear"
                  className="form-input date-input"
                  value={formData.startYear}
                  onChange={handleChange}
                  disabled={isViewMode}

                >
                  {Array.from({ length: 11 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-sub-group">
                <label htmlFor="startMonth" className="form-label">
                  Start Month
                </label>
                <select
                  id="startMonth"
                  className="form-input date-input"
                  value={formData.startMonth}
                  onChange={handleChange}
                  disabled={isViewMode}

                >
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
                    (month, index) => (
                      <option key={index} value={index + 1}>
                        {month}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-sub-group">
                <label htmlFor="endYear" className="form-label">
                  End Year
                </label>
                <select
                  id="endYear"
                  className="form-input date-input"
                  value={formData.endYear}
                  onChange={handleChange}
                  disabled={formData.isStillWorking || isViewMode}
                >
                  {Array.from({ length: 11 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-sub-group">
                <label htmlFor="endMonth" className="form-label">
                  End Month
                </label>
                <select
                  id="endMonth"
                  className="form-input date-input"
                  value={formData.endMonth}
                  onChange={handleChange}
                  disabled={formData.isStillWorking || isViewMode}
                >
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
                    (month, index) => (
                      <option key={index} value={index + 1}>
                        {month}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div className="form-group">
              <input
                type="checkbox"
                id="isStillWorking"
                checked={formData.isStillWorking} // Use checked instead of value
                onChange={handleChange}
                disabled={isViewMode}

              />
              <label htmlFor="isStillWorking" className="form-label">
                I am still working here
              </label>
            </div>

            <div className="form-group form-group-description">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                className="form-input"
                rows={10}
                value={formData.description}
                onChange={handleChange}
                placeholder="Work Description..."
                disabled={isViewMode}

              />
            </div>

            <div className="submit-form-group">
            {(!isEditMode && !isViewMode) ? <button className="portolab-btn-secondary submit-btn" onClick={() => resetForm()} disabled={isSubmitting}>Reset</button> : <div></div>}


              <button className="portolab-btn submit-btn" onClick={handleCreate}>
              {isEditMode ? "Update" : isViewMode ? "Edit" : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkExperiencePage;
