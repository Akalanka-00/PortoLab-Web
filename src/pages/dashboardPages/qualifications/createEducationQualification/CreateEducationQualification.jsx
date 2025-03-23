import React, { useEffect, useState } from 'react';
import './createEducationQualification.scss';
import '../../dashboard.scss';
import { EducationAPI } from '../../../../api/qualification/education.api';
import Swal from 'sweetalert2';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const CreateEducationQualificationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    college: '',
    course: '',
    result: '',
    startYear: new Date().getFullYear(),
    startMonth: 1,
    endYear: new Date().getFullYear(),
    endMonth: 1,
    status: false,
  });

  const [qualification, setQualification] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams(); // Get ID from URL if available
  const location = useLocation();
  const isEditMode = location.pathname.includes('/edit/');
  const isViewMode = location.pathname.includes('/view/');
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
      status: false,
    });
  };

  const handleCreate = async () => {
    console.log('Education Qualification Data:', formData);
    setIsSubmitting(true);
    if (isEditMode) {

      const response = await educationApi.updateEducation(id, formData);
      if (response) {
        Swal.fire({
          icon: 'success',
          position: 'top-end',
          title: 'Educational Experience updated successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSubmitting(false);
        navigate('/dashboard/qualifications');
      }
    } else if (isViewMode) {
      navigate(`/dashboard/qualifications/edit/${id}`);
    }
    else {
      const response = await educationApi.createEducation(formData);
      if (response) {
        Swal.fire({
          icon: 'success',
          position: 'top-end',
          title: 'Educational Experience created successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSubmitting(false);
        navigate('/dashboard/qualifications');
      }else{
        resetForm();
      }
    }
    setIsSubmitting(false);
  };

  const fetchQualifications = async () => {
    const response = await educationApi.getEducationById(id);
    if (response) {
      setQualification(response);
      setFormData({
        college: response.collegeName || '',
        course: response.courseName || '',
        result: response.result || '',
        startYear: response.startYear || new Date().getFullYear(),
        startMonth: response.startMonth || 1,
        endYear: response.endYear || new Date().getFullYear(),
        endMonth: response.endMonth || 1,
        status: response.status || false,
      });
    }
  };

  useEffect(() => {
    if (isEditMode || isViewMode) {
      fetchQualifications();
    }
  }, [id]);

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
                disabled={isViewMode}
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
                disabled={isViewMode}

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
                disabled={isViewMode}

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
                <label htmlFor="endMonth" className="form-label">
                  End Month
                </label>
                <select
                  id="endMonth"
                  className="form-input date-input"
                  value={formData.endMonth}
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

            <div className="submit-form-group">
              {(!isEditMode && !isViewMode) ? <button className="portolab-btn-secondary submit-btn" onClick={() => resetForm()}>Reset</button> : <div></div>}


              <button className="portolab-btn submit-btn" disabled={isSubmitting} onClick={handleCreate}>
                {isEditMode ? "Update" : isViewMode ? "Edit" : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEducationQualificationPage;
