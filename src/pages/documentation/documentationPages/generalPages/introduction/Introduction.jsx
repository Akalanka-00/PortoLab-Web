import React from 'react'
import './introduction.scss'
import ApiImage from '../../../../../assets/images/api.png'
const IntroductionPage = () => {
  return (
    <div className='introduction-page-container'>
      <h1 className='introduction-page-title'>Introduction</h1>
      <div className='introduction-page-content'>
        <p>Welcome to the Project Management Tool (PMT) API documentation. This documentation provides a comprehensive guide to the PMT API, including its endpoints, request and response formats, and usage examples.</p>
        <p>The PMT API is designed to help you manage your projects efficiently. It allows you to create, read, update, and delete project-related data programmatically.</p>
        <p>In this documentation, you will find:</p>
        <ul>
          <li>An overview of the API</li>
          <li>Authentication details</li>
          <li>Endpoint descriptions</li>
          <li>Request and response examples</li>
        </ul>
        <p>If you have any questions or need further assistance, please feel free to reach out to our support team.</p>
      </div>
      <div className='introduction-page-image'>
        <img src={ApiImage} alt="API" />
    </div>
    hsdfs
    </div>
  )
}

export default IntroductionPage