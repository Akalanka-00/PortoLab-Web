import React, { use, useEffect, useState } from 'react'

import './navbar.scss'
import { FaHistory, FaMoon, FaStar } from 'react-icons/fa'
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from 'react-icons/ci'
import { IoSunnySharp } from 'react-icons/io5'
import { HiMiniBell } from 'react-icons/hi2'
import Profile from "../../assets/images/profile.png"
import { RiInformation2Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { ProfileAPI } from '../../api/profile/profile.api';

const Navbar = () => {
  const profileAPI = new ProfileAPI();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [profilePic, setProfilePic] = useState(Profile);
  const toggleTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

  }

  const getProfile = async () => {
    const data = await profileAPI.getProfile();
    if (data) {
      setProfilePic(data.profile || Profile);
    }
  };


  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    localTheme && toggleTheme(localTheme);
    getProfile();
  }, []);

  return (
    <div className='navbar-container'>
      <div className="navbar-leading">
        <GiHamburgerMenu className='menu-icon' />

      </div>
      <div className="navbar-trailing">

        <div className="option-panel">
          <RiInformation2Line className='option-icon' onClick={() => navigate("/documentation")} />
          {theme === 'light' ? <FaMoon onClick={() => toggleTheme('dark')} className='option-icon'></FaMoon > : <IoSunnySharp onClick={() => toggleTheme('light')} className='option-icon' />}
          <HiMiniBell className='option-icon' />
        </div>

        <div className="profile">
          <img src={profilePic} alt="profile" />
        </div>
      </div>
    </div>
  )
}

export default Navbar