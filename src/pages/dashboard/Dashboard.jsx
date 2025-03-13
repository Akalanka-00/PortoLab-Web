import React from 'react'
import SideBar from '../../components/sidebar/SideBar'
import Navbar from '../../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import './dashbard.scss'

const DashboardPage = () => {
  return (
    <div className='dashbard-container'>
      <SideBar/>
      <div className="navbar-wrapper">
      <Navbar/>
      <div className="outlet"><Outlet></Outlet></div>
      </div>
     
    </div>
  )
}

export default DashboardPage