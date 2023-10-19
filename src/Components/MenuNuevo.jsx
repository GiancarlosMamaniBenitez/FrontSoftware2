import React, { useState } from "react";
import NavBar from "@/Components/NavBar";
import SideBar from "@/Components/SideBar";
import { Link } from "react-router-dom";

const MenuNuevo = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="menu-container">
      <NavBar toggleSidebar={toggleSidebar} />
      <div
        className={`content-container ${isSidebarOpen ? "pushed" : ""}`}
      >
        {isSidebarOpen && <SideBar />}
        {/* Resto del contenido principal */}
      </div>
    </div>
  );
};

export default MenuNuevo;
