import React, {useEffect, useState } from 'react'
import { GiF1Car } from 'react-icons/gi'

import './sidebar.scss'
import sidebarData from '../../data/sidebar.data'
import { TbLogout } from 'react-icons/tb'
import { CiCircleQuestion } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
const SideBar = () => {

    const [activeMenu, setActiveMenu] = useState(-1);
    const navigate = useNavigate();

    useEffect(() => {
        const currentPath = window.location.pathname;
        const currentMenu = sidebarData.find((item) =>   currentPath.includes(`/dashboard${item.link}`)) || sidebarData[0];
        setActiveMenu(sidebarData.indexOf(currentMenu));
    },[]);

    const handleMenuClick = (id) => {
        setActiveMenu(id);
        const menu = sidebarData[id];
        navigate(`/dashboard${menu.link}`);
    }
    return (
        <div className='sidebar-container'>
            <div className="header">
                {/* <GiF1Car className="header-icon" /> */}
                <div className='header-text'>PortoLab</div>
            </div>

            <div className="sidebar-content">
                <div className="sidebar-body">
                    {sidebarData.map((item, idx) => {
                        return (
                            <div key={idx} className={`sidebar-item ${activeMenu=== idx&& "active"}`} onClick={() => handleMenuClick(idx)}>
                                <div className="sidebar-icon">{item.icon}</div>
                                <div className="sidebar-title">{item.title}</div>
                            </div>
                        )
                    })}
                </div>
                <div className="sidebar-footer">

                    <div className="sidebar-item">
                        <div className="sidebar-icon"><CiCircleQuestion/></div>
                        <div className="sidebar-title">Help & getting started</div>
                    </div>

                    <div className="sidebar-item">
                        <div className="sidebar-icon"><TbLogout/></div>
                        <div className="sidebar-title">Logout</div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default SideBar