import React, { useState } from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import Sidebar from './SideBar'; 
import { useRouter } from 'next/navigation';

function NavBar(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const currentUser = localStorage.getItem("currentUser");

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const router = useRouter();

    const redirectToPerfil = () => {
        router.push("/Perfil");
    };

    return (
        <div className="navbar">
            {currentUser ? (
               <>
                <div className="navbar-barra">
                    <button className="left-button" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    {isSidebarOpen && <Sidebar />}
                    </div>

                    <div className="title">
                        <Link href="/" className="Wisewallet1">
                            WiseWallet
                        </Link>
                    </div>
                    <div className="right-buttons">
                        <button className="right-button" onClick={redirectToPerfil}>
                            
                                <FontAwesomeIcon icon={faUser} />
                            
                        </button>
                    </div>
              </> 
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
            )}
        </div>
    );
}

export default NavBar;
