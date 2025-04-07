import React from 'react'
import "./homeNavbar.scss"
import { useNavigate } from 'react-router-dom'
import Logo from "../../assets/images/logo.png"
const HomeNavbar = () => {

  const navigate = useNavigate();
  return (
    // <div className='home-navbar-container'>
    //   <div className="home-navbar-logo">PMT</div>
    //   <div className="home-navbar-items">
    //     <div className="home-navbar-item" onClick={()=> navigate("/")}>Home</div>
    //     <div className="home-navbar-item">About Us</div>
    //     <div className="home-navbar-item" onClick={()=> navigate("/documentation")}>Documentation</div>
    //     <div className="home-navbar-item">Contact Us</div>
    //   </div>
    //   <div className="home-navbar-login">
    //     {/* <div className="home-navbar-login-button" onClick={()=> navigate("/login")}>Login</div> */}
    //     <div className="home-navbar-login-button" onClick={()=> navigate("/register")}>Get Start</div>
    //   </div>
    //     </div>



    <header id="header" className="home-navbar d-flex align-items-center sticky-top">
      <div className="container-fluid navbar-container-xl position-relative d-flex align-items-center">

        <div onClick={() => navigate("/")} className="logo d-flex align-items-center me-auto">
          <img src={Logo} alt="" />
          <h1 className="sitename">PMT</h1>
        </div>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><div className="navitem active" onClick={() => navigate("/")}>Home<br /></div></li>
            <li><div className='navitem' onClick={() => {
              navigate("/");
              const section = document.getElementById('about');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}>About</div></li>
            <li><div className='navitem' onClick={() => {
              navigate("/");
              const section = document.getElementById('services');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}>Services</div></li>
            <li><div className='navitem' onClick={() => navigate("/documentation")}>Documentation</div></li>


            <li><div className='navitem'>Contact</div></li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <div className="btn-getstarted" onClick={() => navigate("/register")}>Get Started</div>

      </div>
    </header>
  )
}

export default HomeNavbar