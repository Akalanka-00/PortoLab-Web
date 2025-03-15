import React, { useState, useEffect } from 'react';
import './profile.scss';
import Avatar from "../../../assets/images/profile.png";
import Swal from "sweetalert2";
import { ProfileAPI } from '../../../api/profile/profile.api';
import convertImageToBase64 from '../../../utils/ImageToBase64';

const ProfilePage = () => {
    const profileAPI = new ProfileAPI();
    
    const [personalInfo, setPersonalInfo] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        address: "",
    });
    
    const [bio, setBio] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [profilePic, setProfilePic] = useState(Avatar);
    const [cv, setCv] = useState("");
    
    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const data = await profileAPI.getProfile();
        console.log(data);
        if (data) {
            setPersonalInfo({
                fname: data.fname,
                lname: data.lname,
                email: data.email,
                phone: data.phone,
                address: data.address,
            });
            setBio(data.bio || "");
            setProfilePic(data.profile || Avatar);
            setCv(data.cv || "");
            
        }
    };

    const handlePersonalInfoUpdate = async () => {
        if (editMode) {
            const success = await profileAPI.updatePersonalInfo(personalInfo);
            if (success) {
                Swal.fire("Success", "Profile updated successfully", "success");
                setEditMode(false);
            }
        } else {
            setEditMode(true);
        }
    };

    const handleBioUpdate = async () => {
        const success = await profileAPI.updateBio({ bio });
        if (success) {
            Swal.fire("Success", "Bio updated successfully", "success");
        }
    };

    const handleProfilePictureUpdate = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const base64 = await convertImageToBase64(file);
            const success = await profileAPI.updateProfile(base64);
            if (success) {
                Swal.fire("Success", "Profile picture updated successfully", "success");
                setProfilePic(URL.createObjectURL(file));
            }
        }
    };

    const handleCvUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const base64 = await convertImageToBase64(file);
            console.log(base64);
            const cvUrl = await profileAPI.updateCv(base64);
            if (cvUrl) {
                setCv(cvUrl)
                Swal.fire("Success", "CV uploaded successfully", "success");
            }
        }
    };

    const handleCvDownload = () => {
        if (cv) {
            const link = document.createElement("a");
            link.href = cv;
            link.download = `${personalInfo.fname}_${personalInfo.lname}_CV.pdf`; // You can modify the file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            Swal.fire("No CV Found", "Please upload a CV first.", "warning");
        }
    };

    return (
        <div className='dashboard-content-container'>
            <div className="header">
                <div className="header-title">Profile</div>
            </div>

            <div className="dashboard-profile-container">
                <div className="personal-info-card">
                    <div className="profile-leading-option">
                        <img src={profilePic} alt="Avatar" className="avatar" />
                        <input type="file" accept="image/*" onChange={handleProfilePictureUpdate} hidden id="upload-profile" />
                        <label htmlFor="upload-profile" className='portolab-btn-secondary mt-4'>Upload New Profile</label>
                    </div>
                    {editMode ? (
                        <>
                            <div className="personal-info">
                                <div className="info-title">First Name</div>
                                <input type="text" className="info-value-input" value={personalInfo.fname} onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })} />
                            </div>

                            <div className="personal-info">
                                <div className="info-title">Last Name</div>
                                <input type="text" className="info-value-input" value={personalInfo.lname} onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })} />
                            </div>

                            <div className="personal-info">
                                <div className="info-title">Email</div>
                                <input type="text" className="info-value-input" disabled value={personalInfo.email} />
                            </div>

                            <div className="personal-info">
                                <div className="info-title">Phone</div>
                                <input type="text" className="info-value-input" value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} />
                            </div>

                            <div className="personal-info">
                                <div className="info-title">Address</div>
                                <input type="text" className="info-value-input" value={personalInfo.address} onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="personal-info">
                                <div className="info-title">First Name</div>
                                <div className="info-value">{personalInfo.fname}</div>
                            </div>

                            <div className="personal-info">
                                <div className="info-title">Last Name</div>
                                <div className="info-value">{personalInfo.lname}</div>
                            </div>

                            <div className="personal-info">
                                <div className="info-title">Email</div>
                                <div className="info-value">{personalInfo.email}</div>
                            </div>
                            <div className="personal-info">
                                <div className="info-title">Phone</div>
                                <div className="info-value">{personalInfo.phone}</div>
                            </div>
                            <div className="personal-info">
                                <div className="info-title">Address</div>
                                <div className="info-value">{personalInfo.address}</div>
                            </div>
                        </>
                    )}
                    <div className="portolab-btn mt-3" onClick={handlePersonalInfoUpdate}>{editMode ? "Save Profile" : "Edit Profile"}</div>
                </div>

                <div className="profile-right-container">
                    <div className="cv-container">
                        <div className="cv-upload-title">Submit your personal CV from here</div>
                        <div className="cv-actions">
                            <div className="portolab-btn-secondary" onClick={handleCvDownload}>Download</div>
                            <input type="file" accept=".pdf,.doc,.docx" onChange={handleCvUpload} hidden id="upload-cv" />
                            <label htmlFor="upload-cv" className="portolab-btn">Upload</label>
                        </div>
                    </div>

                    <div className="bio-container">
                        <div className="bio-title">Your personal Bio</div>
                        <textarea className="bio-textarea" rows={5} placeholder="Write your bio here" value={bio} onChange={(e) => setBio(e.target.value)} />
                        <div className="bio-leading-btn">
                            <div className="portolab-btn" onClick={handleBioUpdate}>Save</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
