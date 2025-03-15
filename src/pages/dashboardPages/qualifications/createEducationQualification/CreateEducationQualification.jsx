import React, { useState } from 'react';
import './createEducationQualification.scss';
import '../../dashboard.scss';
import { EducationAPI } from '../../../../api/qualification/education.api';

const CreateEducationQualificationPage = () => {
  const [formData, setFormData] = useState({
    college: '',
    course: '',
    result: '',
    startYear: new Date().getFullYear(),
    startMonth: 1,
    endYear: new Date().getFullYear(),
    endMonth: 1,
  });

  const educationApi = new EducationAPI();

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
      college: '',
      course: '',
      result: '',
      startYear: new Date().getFullYear(),
      startMonth: 1,
      endYear: new Date().getFullYear(),
      endMonth: 1,
    });
  };

  const handleCreate = async () => {
    console.log('Education Qualification Data:', formData);
    await educationApi.createEducation(formData);
  };

  return (
    <div className="dashboard-content-container">
      <div className="header">
        <div className="header-title">Add new Education Qualification</div>
      </div>
      <div className="education-qualification-container">
        <div className="education-qualification-form-container">
          <div className="new-education-qualification-form">
            <div className="form-group">
              <label htmlFor="college" className="form-label">
                College Name
              </label>
              <input
                type="text"
                className="form-input"
                id="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="College Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="course" className="form-label">
                Course Name
              </label>
              <input
                type="text"
                className="form-input"
                id="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Course Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="result" className="form-label">
                Result
              </label>
              <input
                type="text"
                className="form-input"
                id="result"
                value={formData.result}
                onChange={handleChange}
                placeholder="Result"
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

export default CreateEducationQualificationPage;
