import React, { useState } from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import Sidebar from './SideBar'; 
import { useRouter } from 'next/navigation';

function NavBar({ isSidebarOpen, setIsSidebarOpen }){
   
    const currentUser = localStorage.getItem("currentUser");

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const router = useRouter();

    const redirectToPerfil = () => {
        router.push("/Perfil");
    };

    return (
        //        <div className={`navbar ${isSidebarOpen ? 'sidebar-open' : ''}`}>

        <div className="navbar">
        {currentUser ? (
                <div className="navbar-content">
                    <button className="left-button" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    
                    <div className="title">
                        <Link href="/" className="Wisewallet">
                            WiseWallet
                        </Link>
                    </div>
                    <div className="right-buttons">
                        <button className="right-button" onClick={redirectToPerfil}>
                            <Link href="/Perfil">
                                <FontAwesomeIcon icon={faUser} />
                            </Link>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="navbar-content">
                    <div> </div>
                    <div className="title">
                        <Link href='./' className='Wisewallet'>
                            WiseWallet
                        </Link>
                    </div>
                    <div className="right-buttons">
                        <Link href='/Login' className="right-button">Inicia Sesión</Link>
                        <Link href='/Signup' className="right-button">Regístrate</Link>
                    </div>
                </div>
            )}{isSidebarOpen && <Sidebar />}
        </div>
        
    );
}

export default NavBar;
