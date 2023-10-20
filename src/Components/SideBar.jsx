
import React from "react";
import Link from "next/link";
import './sidebar.css'
import {auth} from '../config/Backend'
import { signOut } from 'firebase/auth';
function SideBar(){
  const handleLogout = () => {
    // Elimina la marca o token de autenticación del Local Storage
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("currentUser")
    signOut(auth).then(()=>{
      console.log('Signed out')
  })
    // Redirige al usuario a la página de inicio de sesión
    window.location.href = "/Home";
  };
  return (
    <div>
      <ul className="sidebar">
      
        
        <li><Link href='/Perfil' className="link-sidebar">Datos de Perfil</Link></li>
        <li><Link href='/VerTarjeta' className="link-sidebar">Ver Tarjetas</Link></li>
        <li><Link href='/Reportes' className="link-sidebar">Reportes</Link></li>
        <li><Link href='/VerFinanzas' className="link-sidebar">Ver Ingresos y Gastos</Link></li>
        <li> {localStorage.getItem("userLoggedIn") && (
        <div className="logout-container">
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}</li>
       
      </ul>
    </div>
  );
}

export default SideBar;
