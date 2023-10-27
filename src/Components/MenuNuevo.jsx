import React, { useState } from "react";
import NavBar from "@/Components/NavBar";
import SideBar from "@/Components/SideBar";
import { Link } from "react-router-dom";

const MenuNuevo = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Agregar estado para rastrear la autenticación del usuario

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = () => {
    // Simula la autenticación del usuario
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Simula cerrar sesión del usuario
    setIsLoggedIn(false);
  };

  return (
    <div className="menu-container">
      <NavBar
        toggleSidebar={toggleSidebar}
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
      <div className={`content-container ${isSidebarOpen ? "pushed" : ""}`}>
        {isSidebarOpen && <SideBar />}
        {/* Resto del contenido principal */}
      </div>
    </div>
  );
};

export default MenuNuevo;
