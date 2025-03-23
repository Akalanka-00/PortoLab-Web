import React, {useEffect, useState } from 'react'
import { GiF1Car } from 'react-icons/gi'

import './sidebar.scss'
import sidebarData from '../../data/sidebar.data'
import { TbLogout } from 'react-icons/tb'
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
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

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Logout!',
            cancelButtonText: 'No, Cancel!',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                navigate('/login');
            }
        });
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
                        <div className="sidebar-icon"><IoSettingsOutline /></div>
                        <div className="sidebar-title">Settings</div>
                    </div>

                    <div className="sidebar-item">
                        <div className="sidebar-icon"><TbLogout/></div>
                        <div className="sidebar-title" onClick={handleLogout}>Logout</div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default SideBar