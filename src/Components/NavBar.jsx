import React, { useState } from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';

import Link from "next/link";
import Sidebar from './SideBar'; 
import { useRouter } from 'next/navigation';

function NavBar({ isSidebarOpen, setIsSidebarOpen, sesion }){
    
   

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const router = useRouter();

    const redirectToPerfil = () => {
        router.push("/Perfil");
    };

    return (
        //        <div className={`navbar ${isSidebarOpen ? 'sidebar-open' : ''}`}>

       <>
        {sesion ? (
                <div className="navbar-content">
                    <button className="left-button" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    
                    <div className={`title${isSidebarOpen ? '-shifted' : ''}`}>
                    <span onClick={() => router.push('/')} className="Wisewallet">WiseWallet</span>
                        
                    </div>
                    <div className="right-buttons">
                        <button className="right-button" onClick={redirectToPerfil}>
                        <span onClick={() => router.push('/Perfil')} className="Wisewallet"><FontAwesomeIcon icon={faUser} /></span>
                            
                        </button>
                    </div>
                </div>
            ) : (
                <div className="navbar-content">
                    <div> </div>
                    <div className="title">
                    <span onClick={() => router.push('/')} className="Wisewallet">WiseWallet</span>
                    </div>
                    <div className="right-buttons">
                    <span onClick={() => router.push('/Login')} className="right-button">Inicia Sesión</span>
                    <span onClick={() => router.push('/Signup')} className="right-button">Regístrate</span>
                  
                    </div>
                </div>
            )}{isSidebarOpen && <Sidebar />}
        
        </>
    );
}

export default NavBar;
