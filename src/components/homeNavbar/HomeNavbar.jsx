import React, { useEffect, useState } from 'react'
import "./homeNavbar.scss"
import { useNavigate } from 'react-router-dom'
import Logo from "../../assets/images/logo.png"
import { MdOutlineMenu } from 'react-icons/md'
import { BiX } from 'react-icons/bi'
const HomeNavbar = () => {

  const navigate = useNavigate();
  const [mobileNavActive, setMobileNavActive] = useState(false);

  useEffect(() => {
    if (mobileNavActive) {
      document.body.classList.add('mobile-nav-active');
    } else {
      document.body.classList.remove('mobile-nav-active');
    }
  }, [mobileNavActive]);

  const toggleMobileNav = () => {
    setMobileNavActive((prev) => !prev);
  };

  return (
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
            <div className="btn-getstarted" onClick={() => navigate("/register")}>Get Started</div>

          </ul>
          <div className='mobile-nav-toggle d-xl-none'  onClick={toggleMobileNav}>
            {mobileNavActive ? <BiX className='mobile-nav-icon' size={30} /> : <MdOutlineMenu className='mobile-nav-icon' size={30} />}
          </div>
   
        </nav>


      </div>
    </header>
  )
}

export default HomeNavbar