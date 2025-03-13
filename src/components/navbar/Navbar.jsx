import React, { useEffect, useState } from 'react'

import './navbar.scss'
import { FaHistory, FaMoon, FaStar } from 'react-icons/fa'
import { RiSideBarFill } from 'react-icons/ri'
import { CiSearch } from 'react-icons/ci'
import { IoSunnySharp } from 'react-icons/io5'
import { HiMiniBell } from 'react-icons/hi2'
import Profile from "../../assets/images/profile.png"

const Navbar = () => {

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

  }

  const getProfile = () => {
    const json = localStorage.getItem('user');
    const user = JSON.parse(json);
    
    if (user && user.picture) {
      // Fetch the image and convert it to Base64
      const imageUrl = user.picture;
      return fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        })
        .catch(error => {
          console.error("Error converting image to Base64:", error);
          return Profile; // Return a default profile if error occurs
        });
    }
  
    return Profile; // Return a default profile if user or picture is not found
  };
  

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    localTheme && toggleTheme(localTheme);
  },[]);

  return (
    <div className='navbar-container'>
      <div className="navbar-leading">
        <RiSideBarFill />
        <FaStar />
      </div>
      <div className="navbar-trailing">
        {/* <div className="search-box">
          <CiSearch />
          <input type="text" placeholder='Search' />
          <button>⌘/</button>
        </div> */}

        <div className="option-panel">

          {theme === 'light' ? <FaMoon onClick={() => toggleTheme('dark')} className='option-icon'></FaMoon > : <IoSunnySharp onClick={() => toggleTheme('light')} className='option-icon'/>}
        {/* <FaHistory className='option-icon' /> */}
        <HiMiniBell className='option-icon' />
        {/* <RiSideBarFill className='option-icon' /> */}
        </div>

        <div className="profile">
          <img src={Profile} alt="profile" />
        </div>
      </div>
    </div>
  )
}

export default Navbar