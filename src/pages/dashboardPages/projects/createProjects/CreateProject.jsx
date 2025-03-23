import React, { useEffect, useRef, useState } from 'react';
import './createProject.scss';
import '../../dashboard.scss';
import placeholder from '../../../../assets/images/placeholder.jpg';
import { ProjectAPI } from '../../../../api/project/project.api';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const CreateProjectPage = () => {
    const ref = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL if available
    const location = useLocation();
    const isEditMode = location.pathname.includes('/edit/');
    const isViewMode = location.pathname.includes('/view/');
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
        isStillWorking: false,

    });
    const [isPublishing, setIsPublishing] = useState(false);

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
            isStillWorking: false,

        })
    };

    // const handleChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.id]: e.target.value,
    //     });
    // };

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

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => setImage(reader.result);
        }
    };

    const handleCreate = async () => {
        const projectAPI = new ProjectAPI();
        setIsPublishing(true);
        if (isEditMode) {
            const project = await projectAPI.updateProject({...formData, image}, id);
            if (project) {
                navigate('/dashboard/projects');
            }else{
                resetForm();
            }
            setIsPublishing(false);
        }else if(isViewMode){
            navigate(`/dashboard/projects/edit/${id}`);
        }
        else{
            const project = await projectAPI.createProject({...formData, image});
        if (project) {
            navigate('/dashboard/projects');
        }else{
            resetForm();
        }
        setIsPublishing(false);
        }
    };

    const handleTechnologiesChange = (e) => {
        if (e.key === 'Enter') {
            const tech = e.target.value.trim();
            if (tech) {
                setFormData({
                    ...formData,
                    technologies: [...formData.technologies, tech],
                });
                e.target.value = '';
            }
        }
    };

    const handleRemoveTechnology = (techToRemove) => {
        setFormData({
            ...formData,
            technologies: formData.technologies.filter((tech) => tech !== techToRemove),
        });
    };

    useEffect(() => {
        if (isEditMode || isViewMode) {
            fetchProjectData();
        }
    }, [id]);

    const fetchProjectData = async () => {
        const projectAPI = new ProjectAPI();
        const project = await projectAPI.getProjectById(id);
        if (project) {
            setFormData({
                title: project.title || '',
                startYear: project.startYear || new Date().getFullYear(),
                startMonth: project.startMonth || 1,
                endYear: project.endYear || new Date().getFullYear(),
                endMonth: project.endMonth || 1,
                technologies: project.technologies || [],
                github: project.gitHub || '',
                demo: project.web || '',
                description: project.description || '',
                isStillWorking: project.isStillWorking || false,
            });
            setImage(project.banner || placeholder);
        }
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
                            <input type="text" className='form-input' id="title" value={formData.title} onChange={handleChange} placeholder='Project Title' disabled={isViewMode} />
                        </div>

                        <div className="form-group">
                            <div className="form-sub-group">
                                <label htmlFor="startYear" className='form-label'>Start Year</label>
                                <select id="startYear" className='form-input date-input' value={formData.startYear} onChange={handleChange}  disabled={isViewMode}>
                                    {Array.from({ length: 11 }, (_, i) => {
                                        const year = new Date().getFullYear() - i;
                                        return <option key={year} value={year}>{year}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-sub-group">
                                <label htmlFor="startMonth" className='form-label'>Start Month</label>
                                <select id="startMonth" className='form-input date-input' value={formData.startMonth} onChange={handleChange}  disabled={isViewMode}>
                                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                                        <option key={index} value={index + 1}>{month}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="form-sub-group">
                                <label htmlFor="endYear" className='form-label'>End Year</label>
                                <select id="endYear" className='form-input date-input' value={formData.endYear} onChange={handleChange} disabled={formData.isStillWorking || isViewMode}>
                                    {Array.from({ length: 11 }, (_, i) => {
                                        const year = new Date().getFullYear() - i;
                                        return <option key={year} value={year}>{year}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-sub-group">
                                <label htmlFor="endMonth" className='form-label'>End Month</label>
                                <select id="endMonth" className='form-input date-input' value={formData.endMonth} onChange={handleChange} disabled={formData.isStillWorking || isViewMode}>
                                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                                        <option key={index} value={index + 1}>{month}</option>
                                    ))}
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
                I am still working on this project
              </label>
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
                                disabled={isViewMode}
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
                                    disabled={isViewMode}
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
                            <label htmlFor="github" className='form-label'>GitHub</label>
                            <input type="url" className='form-input' id="github" value={formData.github} placeholder='www.github.com' onChange={handleChange}  disabled={isViewMode}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="demo" className='form-label'>Web</label>
                            <input type="url" className='form-input' id="demo" value={formData.demo} placeholder='www.demo.com' onChange={handleChange}  disabled={isViewMode}/>
                        </div>


                        <div className="form-group form-group-description">
                            <label htmlFor="project-description" className='form-label'>Description</label>
                            <textarea type="text" id="description" className='form-input' rows={10} value={formData.description} onChange={handleChange}  disabled={isViewMode} placeholder='Project Description...'/>
                        </div>

                        <div className="submit-form-group">
                            {(!isEditMode && !isViewMode) ? <button className="portolab-btn-secondary submit-btn" onClick={() => resetForm()}>Reset</button> : <div></div> }                            
                            <button className="portolab-btn submit-btn" onClick={handleCreate} disabled={isPublishing}>{isEditMode? "Update": isViewMode? "Edit": "Create"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProjectPage;
