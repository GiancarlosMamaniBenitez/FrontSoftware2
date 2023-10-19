import React, { useState } from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import Sidebar from './SideBar'; 

function NavBar(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const perfil = () =>{

  }
  return (
    <div className="navbar">
      <button className="left-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      {isSidebarOpen && <Sidebar />}

      
      <div className="title"><Link href='./' className='title'>WiseWallet</Link></div>
      
      <button className="right-button" onClick={perfil}>
        
        <Link href='/Perfil'><FontAwesomeIcon icon={faUser} /></Link>
      </button>

      
      

      

    </div>
  );
}

export default NavBar;