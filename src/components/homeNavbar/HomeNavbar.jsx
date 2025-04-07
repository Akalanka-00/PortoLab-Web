import React, { useEffect, useState } from 'react'
import "./homeNavbar.scss"
import { useNavigate, useLocation } from 'react-router-dom'
import Logo from "../../assets/images/logo.png"
import { MdOutlineMenu } from 'react-icons/md'
import { BiX } from 'react-icons/bi'

const HomeNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current location
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

  // Helper function to determine if the current path matches the link
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    if (location.pathname === path) {
      return true;
    }
    // Check if anchor hash matches (for example, /#about)
    if (location.pathname + location.hash === path) {
      return true;
    }
    return false;
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
            <li>
              <a
                href='/#hero'
                className={`navitem ${isActive('/#hero') ? 'active' : ''}`}
                onClick={() => setMobileNavActive(false)}
              >
                Home<br />
              </a>
            </li>
            <li>
              <a
                href='/#about'
                className={`navitem ${isActive('/#about') ? 'active' : ''}`}
                onClick={() => setMobileNavActive(false)}
              >
                About
              </a>
            </li>
            <li>
              <a
                href='/#services'
                className={`navitem ${isActive('/#services') ? 'active' : ''}`}
                onClick={() => {
                  setMobileNavActive(false);
                  const section = document.getElementById('services');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Services
              </a>
            </li>
            <li>
              <div
                className={`navitem ${isActive('/documentation/general') ? 'active' : ''}`}
                onClick={() => {
                  setMobileNavActive(false);
                  navigate("/documentation")
                }}
              >
                Documentation
              </div>
            </li>
            <li>
              <div className='navitem'>Contact</div>
            </li>
            <div
              className="btn-getstarted"
              onClick={() => {
                setMobileNavActive(false);
                navigate("/register")
              }}
            >
              Get Started
            </div>

          </ul>
          <div className='mobile-nav-toggle d-xl-none' onClick={toggleMobileNav}>
            {mobileNavActive ? <BiX className='mobile-nav-icon' size={30} /> : <MdOutlineMenu className='mobile-nav-icon' size={30} />}
          </div>
        </nav>

      </div>
    </header>
  )
}

export default HomeNavbar
