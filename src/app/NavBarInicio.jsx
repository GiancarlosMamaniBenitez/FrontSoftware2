import React, { useState } from 'react';
import './NavBarInicio.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import Sidebar from '../Components/SideBar'; 

function NavBarInicio(){
    
  return (
    <div className="navbar">
      

      
      <div className="title"><Link href='./' className='title'>WiseWallet</Link></div>
      
       <Link href='/Login' className="right-button">Inicia Sesion</Link>
        <Link href='/Signup' className="right-button">Registrate</Link>
      
      

      

    </div>
  );
}

export default NavBarInicio;