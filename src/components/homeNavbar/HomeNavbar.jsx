import React from 'react'
import "./homeNavbar.scss"
import { useNavigate } from 'react-router-dom'

const HomeNavbar = () => {

  const navigate = useNavigate();
  return (
    <div className='home-navbar-container'>
      <div className="home-navbar-logo">PortoLab</div>
      <div className="home-navbar-items">
        <div className="home-navbar-item" onClick={()=> navigate("/")}>Home</div>
        <div className="home-navbar-item">About Us</div>
        <div className="home-navbar-item" onClick={()=> navigate("/documentation")}>Documentation</div>
        <div className="home-navbar-item">Contact Us</div>
      </div>
      <div className="home-navbar-login">
        <div className="home-navbar-login-button" onClick={()=> navigate("/login")}>Login</div>
        <div className="home-navbar-signup-button" onClick={()=> navigate("/register")}>Sign Up</div>
      </div>
        </div>
  )
}

export default HomeNavbar