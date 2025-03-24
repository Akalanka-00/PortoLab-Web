import React, { useState, useRef, useEffect } from 'react';
import './createSkill.scss';
import placeholder from '../../../../assets/images/placeholder.jpg';
import { SkillAPI } from '../../../../api/skill/skill.api';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateSkillPage = () => {
    const ref = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams(); // Get Skill ID from URL
    const location = useLocation();
    const skillApi = new SkillAPI();

    const isEditMode = location.pathname.includes('/edit/');
    const isViewMode = location.pathname.includes('/view/');

    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        skillName: '',
        expertLevel: 'Beginner',
        status: "public",
    });

    // Fetch existing skill data if in edit/view mode
    useEffect(() => {
        if (id && (isEditMode || isViewMode)) {
            fetchSkillData();
        }
    }, [id]);

    const fetchSkillData = async () => {
        const response = await skillApi.getSkillById(id);
        if (response) {
            setFormData({
                skillName: response.name || '',
                expertLevel: response.level || 'Beginner',
                status: response.status || "public",
            });
            setImage(response.icon || placeholder);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => setImage(reader.result);
        }
    };

    const handleSubmit = async () => {
        if (!formData.skillName) {
            Swal.fire('Error', 'Please enter a skill name!', 'error');
            return;
        }

        const skillData = {
            name: formData.skillName,
            icon: image || placeholder,
            level: formData.expertLevel,
            status: formData.status
        };

        let response;
        if (isEditMode) {
            response = await skillApi.updateSkill(id, skillData);
        } else if (isViewMode) {
            navigate(`/dashboard/skills/edit/${id}`);
            return;
        } else {
            response = await skillApi.addSkill(skillData);
        }

        if (response) {
            Swal.fire({
                icon: 'success',
                position: 'top-end',
                title: isEditMode ? 'Skill updated successfully!' : 'New Skill added successfully!',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/dashboard/skills');
        }
    };

    const resetForm = () => {
        setFormData({ skillName: '', expertLevel: 'Beginner', status: "public", });
        setImage(null);
    };

    return (
        <div className="add-skill-container">
            <div className="header">
                <div className="header-title">{isEditMode ? 'Edit Skill' : isViewMode ? 'View Skill' : 'Add Skill'}</div>
            </div>

            <div className="skill-form-container">
                <div className="skill-form-header">
                    <div className="skill-form-title">Skill Details</div>
                </div>

                <div className="new-skill-form">
                    {/* Skill Name */}
                    <div className="form-group">
                        <label htmlFor="skillName" className='form-label'>Skill Name</label>
                        <input
                            type="text"
                            className='form-input'
                            id="skillName"
                            value={formData.skillName}
                            onChange={handleChange}
                            placeholder='Enter Skill Name'
                            disabled={isViewMode}
                        />
                    </div>

                    {/* Skill Icon */}
                    <div className="form-group">
                        <label htmlFor="skillIcon" className='form-label'>Skill Icon</label>
                        <img
                            src={image || placeholder}
                            className='skill-icon-img'
                            onClick={() => !isViewMode && ref.current?.click()}
                            alt="Skill Icon"
                        />
                        {!isViewMode && (
                            <input
                                type="file"
                                className="form-input d-none"
                                ref={ref}
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        )}
                    </div>

                    {/* Expert Level */}
                    <div className="form-group">
                        <label htmlFor="expertLevel" className='form-label'>Expert Level</label>
                        <select
                            id="expertLevel"
                            className="form-input"
                            value={formData.expertLevel}
                            onChange={handleChange}
                            disabled={isViewMode}
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>

                    <div className="submit-form-group">
                        {(!isEditMode && !isViewMode) ? (
                            <button className="portolab-btn-secondary submit-btn" onClick={() => resetForm()}>Reset</button>
                        ):(<div></div>)}

                        <button className="portolab-btn submit-btn" onClick={handleSubmit}>
                            {isEditMode ? "Update" : isViewMode ? "Edit" : "Create"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateSkillPage;
