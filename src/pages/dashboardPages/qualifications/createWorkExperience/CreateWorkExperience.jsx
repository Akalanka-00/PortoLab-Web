import React, { useState } from 'react';
import './createWorkExperience.scss';
import '../../dashboard.scss';

const CreateWorkExperiencePage = () => {
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

  const handleCreate = () => {
    console.log('Work Experience Data:', formData);
  };

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
                  disabled={formData.isStillWorking}
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
                  disabled={formData.isStillWorking}
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
              />
            </div>

            <div className="submit-form-group">
              <button className="portolab-btn-secondary submit-btn" onClick={resetForm}>
                Reset
              </button>

              <button className="portolab-btn submit-btn" onClick={handleCreate}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkExperiencePage;
