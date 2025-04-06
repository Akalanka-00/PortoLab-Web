import React, { useState } from 'react';
import HomeNavbar from '../../components/homeNavbar/HomeNavbar';
import Accordion from 'react-bootstrap/Accordion';
import './documentation.scss';
import { TbCopy } from 'react-icons/tb';
import apiDocData from '../../data/apiDoc.data';
import Footer from '../../components/footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';

const DocumentationPage = () => {
  const navigate = useNavigate();



  return (
    <div className="api-doc-container">
      <HomeNavbar />
      <div className="api-doc-content">
        <div className="api-doc-sidebar">
          <div className="api-doc-sidebar-container">
          <div className="api-sidebar-item" onClick={()=> navigate(`/documentation/general`)}>
              Introduction
            </div>

            <div className="api-sidebar-item" onClick={()=> navigate(`/documentation/general/setup`)}>
              Setup APIs
            </div>
          </div>

          <div className="api-doc-sidebar-container">
            {apiDocData.map((item, index) => (
              <div className="api-sidebar-item" onClick={()=> navigate(`/documentation/api/${item.name}`)} key={index}>
                {item.title}
              </div>
            ))}
          </div>
        </div>
        <div className="outlet"><Outlet></Outlet></div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default DocumentationPage;
