import React from 'react'
import "./footer.scss";
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="footer" className="home-footer light-background">

      <div className="footer-top">
        <div className="row gy-4">
          <div className="col-lg-5 col-md-12 footer-about">
            <a href="index.html" className="logo d-flex align-items-center">
              <span className="sitename">Portfolio Management Terminal (PMT)</span>
            </a>
            <p>PMT is a powerful API-based portfolio builder that lets developers and professionals create, manage, and update personal portfolios effortlessly—no code changes required.</p>
            <div className="social-links d-flex mt-4">
              <a href="https://x.com/shenalakalanka" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100010203702185" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/shenalakalanka00/" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/shenalakalanka/" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="/documentation/general">Documentation</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-6 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><a href="#">API-First Architecture</a></li>
              <li><a href="#">Dynamic Content Management</a></li>
              <li><a href="#">Secure & Reliable</a></li>
              <li><a href="#">Frontend Agnostic</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
            <h4>Contact Us</h4>
            <p>PMT</p>
            <p>Wennappuwa</p>
            <p>Sri Lanka</p>
            <p className="mt-4"><strong>Phone:</strong> <span>+94 767 280 271</span></p>
            <p><strong>Email:</strong> <span>shenalakalanka513@gmail.com</span></p>
          </div>

        </div>
      </div>

      <div className="copyright text-center mt-4">
        <p>© <span>Copyright</span> <strong className="px-1 sitename">PMT</strong> <span>All Rights Reserved</span></p>
        <div className="credits">
          Designed by <a href="https://pmt-official.web.app/">PMT Team</a>
        </div>
      </div>

    </footer>
  )
}

export default Footer