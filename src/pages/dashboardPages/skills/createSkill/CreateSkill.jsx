import React, { useState, useRef } from 'react';
import './createSkill.scss';
import placeholder from '../../../../assets/images/placeholder.jpg';

const CreateSkillPage = () => {
    const ref = useRef(null);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        skillName: '',
        expertLevel: 'Beginner',
    });
    const [skills, setSkills] = useState([]);

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

    const handleAddSkill = () => {
        if (!formData.skillName) {
            alert('Please enter a skill name!');
            return;
        }
        const newSkill = {
            name: formData.skillName,
            icon: image || placeholder,
            level: formData.expertLevel,
        };
        setSkills([...skills, newSkill]);
        setFormData({ skillName: '', expertLevel: 'Beginner' }); // Reset form
        setImage(null); // Reset image
    };

    const resetForm = () => {
        setFormData({ skillName: '', expertLevel: 'Beginner' });
        setImage(null);
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter((skill) => skill.name !== skillToRemove.name));
    };

    return (
        <div className="add-skill-container">
            <div className="header">
                <div className="header-title">Add Skill</div>
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
                        />
                    </div>

                    {/* Skill Icon */}
                    <div className="form-group">
                        <label htmlFor="skillIcon" className='form-label'>Skill Icon</label>
                        <img
                            src={image || placeholder}
                            className='skill-icon-img'
                            onClick={() => ref.current?.click()}
                            alt="Skill Icon"
                        />
                        <input
                            type="file"
                            className="form-input d-none"
                            ref={ref}
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>

                    {/* Expert Level */}
                    <div className="form-group">
                        <label htmlFor="expertLevel" className='form-label'>Expert Level</label>
                        <select
                            id="expertLevel"
                            className="form-input"
                            value={formData.expertLevel}
                            onChange={handleChange}
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>


                    <div className="submit-form-group">
                            <button className="portolab-btn-secondary submit-btn" onClick={() => resetForm()}>Reset</button>
                            
                            <button className="portolab-btn submit-btn" onClick={handleAddSkill}>Create</button>
                        </div>
                </div>
            </div>

        </div>
    );
};

export default CreateSkillPage;
