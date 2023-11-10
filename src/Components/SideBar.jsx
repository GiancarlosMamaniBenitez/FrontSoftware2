import React, { useState } from "react";
import Link from "next/link";
import './sidebar.css'
import { useNavigate } from 'react-router-dom';
import { useRouter } from "next/navigation";
function SideBar() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  
  const router = useRouter();
  const handleLogout = () => {
    // Elimina la marca o token de autenticación del Local Storage
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("sesion");
    
    // Actualiza la variable de estado para reflejar que el usuario ha cerrado sesión
    setIsLoggedOut(true);
    
    // Redirige al usuario a la página de inicio de sesión
    window.location.href = "/";
  };

  // Comprueba si el usuario está autenticado usando localStorage
  const userLoggedIn = localStorage.getItem("userLoggedIn");

  return (
    <div>
      <ul className="sidebar">
      <li><span onClick={() => router.push('/Perfil')} className="link-sidebar">Datos de Perfil</span></li>
      <li><span onClick={() => router.push('/VerTarjeta')} className="link-sidebar">Ver Tarjetas</span></li>
      <li><span onClick={() => router.push('/Reportes')} className="link-sidebar">Reportes</span></li>
      <li><span onClick={() => router.push('/VerFinanzas')} className="link-sidebar">Ver Ingresos y Gastos</span></li>
        
          <li>
            <div className="logout-container">
              <button className="link-sidebar" onClick={handleLogout}>Cerrar sesión</button>
            </div>
          </li>
        
      </ul>
    </div>
  );
}

export default SideBar;
