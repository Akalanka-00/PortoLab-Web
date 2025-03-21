import React from 'react'
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="home-footer">
    <div className="footer-container">
      <p className="footer-container__text">© {new Date().getFullYear()} PortoLab. All rights reserved.</p>
    </div>
  </footer>
    )
}

export default Footer