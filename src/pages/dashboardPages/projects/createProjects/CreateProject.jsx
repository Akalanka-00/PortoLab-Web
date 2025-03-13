import React, { useRef, useState } from 'react';
import './createProject.scss';
import '../../dashboard.scss';
import placeholder from '../../../../assets/images/placeholder.jpg';

const CreateProjectPage = () => {
    const ref = useRef(null);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        startYear: new Date().getFullYear(),
        startMonth: 1,
        endYear: new Date().getFullYear(),
        endMonth: 1,
        technologies: [],
        github: '',
        demo: '',
        description: '',
    });

    const resetForm = () => {
        setFormData({
            title: '',
            startYear: new Date().getFullYear(),
            startMonth: 1,
            endYear: new Date().getFullYear(),
            endMonth: 1,
            technologies: [],
            github: '',
            demo: '',
            description: '',
        })
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

    const handleCreate = () => {
        console.log('Project Data:', formData);
        console.log('Project Banner (Base64):', image);
    };

    const handleTechnologiesChange = (e) => {
        if (e.key === 'Enter') {
            const tech = e.target.value.trim();
            if (tech) {
                setFormData({
                    ...formData,
                    technologies: [...formData.technologies, tech],
                });
                e.target.value = ''; // Clear the input field after adding the technology
            }
        }
    };

    const handleRemoveTechnology = (techToRemove) => {
        setFormData({
            ...formData,
            technologies: formData.technologies.filter((tech) => tech !== techToRemove),
        });
    };

    return (
        <div className='dashboard-content-container'>
            <div className="header">
                <div className="header-title">Create Project</div>
            </div>

            <div className="new-project-container">
                <div className="new-project-form-container">
                    <div className="project-form-header">
                        <div className="project-form-title">Project Details</div>
                    </div>

                    <div className="new-project-form">
                        <div className="form-group">
                            <label htmlFor="title" className='form-label'>Title</label>
                            <input type="text" className='form-input' id="title" value={formData.title} onChange={handleChange} placeholder='Project Title'/>
                        </div>

                        <div className="form-group">
                            <div className="form-sub-group">
                                <label htmlFor="startYear" className='form-label'>Start Year</label>
                                <select id="startYear" className='form-input date-input' value={formData.startYear} onChange={handleChange}>
                                    {Array.from({ length: 11 }, (_, i) => {
                                        const year = new Date().getFullYear() - i;
                                        return <option key={year} value={year}>{year}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-sub-group">
                                <label htmlFor="startMonth" className='form-label'>Start Month</label>
                                <select id="startMonth" className='form-input date-input' value={formData.startMonth} onChange={handleChange}>
                                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                                        <option key={index} value={index + 1}>{month}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="form-sub-group">
                                <label htmlFor="endYear" className='form-label'>End Year</label>
                                <select id="endYear" className='form-input date-input' value={formData.endYear} onChange={handleChange}>
                                    {Array.from({ length: 11 }, (_, i) => {
                                        const year = new Date().getFullYear() - i;
                                        return <option key={year} value={year}>{year}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-sub-group">
                                <label htmlFor="endMonth" className='form-label'>End Month</label>
                                <select id="endMonth" className='form-input date-input' value={formData.endMonth} onChange={handleChange}>
                                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                                        <option key={index} value={index + 1}>{month}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Project Banner</label>
                            <img src={image || placeholder} className='banner-img' onClick={() => ref.current?.click()} alt="Project Banner" />
                            <input
                                type="file"
                                className="form-input d-none"
                                ref={ref}
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>

                        <div className="form-group form-tech-group">
                            <label htmlFor="project-technologies" className='form-label'>Project Technologies</label>
                            <div className="tech-selection-container">
                                <input
                                    type="text"
                                    className='form-input'
                                    id="project-technologies"
                                    onKeyDown={handleTechnologiesChange}
                                    placeholder='Type a technology and press Enter'
                                />
                                <div className={`selected-tech-container ${formData.technologies.length>0 ? 'show' : 'hidden'}`}>
                                    {formData.technologies.map((tech, index) => (
                                        <div className="selected-tech portolab-btn-secondary" key={index}>
                                            <span className='tech-name'>{tech}</span>
                                            <span className='remove-tech-btn' onClick={() => handleRemoveTechnology(tech)}>X</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="githubLink" className='form-label'>GitHub</label>
                            <input type="url" className='form-input' id="githubLink" value={formData.github} placeholder='www.github.com' onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="demoLink" className='form-label'>Web</label>
                            <input type="url" className='form-input' id="demoLink" value={formData.demo} placeholder='www.demo.com' onChange={handleChange} />
                        </div>


                        <div className="form-group form-group-description">
                            <label htmlFor="project-description" className='form-label'>Description</label>
                            <textarea type="text" id="description" className='form-input' rows={10} value={formData.description} onChange={handleChange} placeholder='Project Description...'/>
                        </div>

                        <div className="submit-form-group">
                            <button className="portolab-btn-secondary submit-btn" onClick={() => resetForm()}>Reset</button>
                            
                            <button className="portolab-btn submit-btn" onClick={handleCreate}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProjectPage;
