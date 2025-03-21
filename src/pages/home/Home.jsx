import React from 'react'
import "./home.scss"
import HomeNavbar from '../../components/homeNavbar/HomeNavbar'
import DashboardImage from '../../assets/images/dashboard.png'
import PortfolioImage from '../../assets/images/portfolio.png'
import { useNavigate } from 'react-router-dom'
import featureData from '../../data/feature.data'
import Footer from '../../components/footer/Footer'
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className='home-container'>
      <div className="home-container-header">
        <HomeNavbar />
      </div>
      <div className="home-container-content">
        <div className="home-hero-container">
          <div className="hero-content">
            <div className="hero-title">the best Personal Portfolio API Provider</div>
            <div className="hero-subtitle">Create & maintain your personal portfolio with ease</div>
            <div className="">Configure your portolab account and connect your portfolio with APIs with easy step</div>
            <div className="hero-button" onClick={() => navigate("/login")}>Get Started</div>

          </div>
          <div className="hero-image">
            <img src={DashboardImage} alt="Dashboard" />
          </div>
        </div>

        <div className="home-features-container">
          <div className="home-feature-header">
            <div className="home-features-title">simple to Start. Easy to run</div>
            <div className="home-features-subtitle">Start your free PortoLab journey now!</div>
          </div>

          <div className="home-features-content">
            {featureData.map((feature, index) => (
              <div className="home-feature-item" key={index}>
                <div className="home-feature-icon">{feature.icon}</div>
                <div className="home-feature-title">{feature.title}</div>
                <div className="home-feature-description">{feature.description}</div>
              </div>
            ))}
          </div>

          <div className="home-product-container">
            <div className="home-product-content">
              <div className="home-product-header">
                <div className="home-product-title">Why I should intergrate my personal portfolio with <span>PortoLab?</span></div>
                {/* <div className="home-product-subtitle">What is PortoLab?</div> */}
              </div>

              <div className="home-product-description">
                PortoLab makes managing your portfolio effortless by providing a secure, flexible, and API-driven solution. No need to modify your codebase—just update your portfolio using our API, and your changes are reflected instantly. Whether you're a developer or a creative professional, PortoLab ensures your portfolio stays up-to-date with minimal effort.
              </div>

              <div className="ready-to-start">
                <div className="ready-to-start-title">Ready to start?</div>
                <div className="ready-to-start-subtitle">Get started with PortoLab today and take your portfolio to the next level.</div>
                <div className="ready-to-start-button" onClick={() => navigate("/login")}>Get Started</div>
              </div>
            </div>
            <div className="home-product-image">
              <img src={PortfolioImage} alt="Portfolio" />
            </div>
          </div>

          
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage