
import React from "react";
import Link from "next/link";
import './sidebar.css'
function SideBar(){
  const handleLogout = () => {
    // Elimina la marca o token de autenticación del Local Storage
    localStorage.removeItem("userLoggedIn");

    // Redirige al usuario a la página de inicio de sesión
    window.location.href = "/Login";
  };
  return (
    <div>
      <ul className="sidebar">
      <li><Link href='/Add-card' className="link-sidebar">Add a card</Link></li>
        <li><Link href='/IngresosGastos' className="link-sidebar">Add an expense</Link></li>
        <li><Link href='/dd-card' className="link-sidebar">Add an income</Link></li>
        <li><Link href='/DatosPerfil' className="link-sidebar">Datos de Perfil</Link></li>
        <li><Link href='/VerTarjeta' className="link-sidebar">Ver Tarjetas</Link></li>
        <li><Link href='/IngresosGastos' className="link-sidebar">Ingresos y Gastos</Link></li>
        <li><Link href='/ActualizarIngresos' className="link-sidebar">Actualizar Ingresos</Link></li>
        <li><Link href='/ActualizarGastos' className="link-sidebar">Actualizar Gastos</Link></li>
        <li><Link href='/Informe' className="link-sidebar">Informe</Link></li>
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
