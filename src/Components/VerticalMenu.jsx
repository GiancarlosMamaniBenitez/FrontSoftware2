import React from 'react';
import { Nav } from 'react-bootstrap';
import menu from "./menu.css";

 

const VerticalMenu = () => {
  return (
    <div className="sidenav">
      <a href="#Inicio">Inicio</a>
            <br/>
            <a href="#DatosPerfil">Datos de Perfil</a>
            <br/>
            <a href="#VerTarjetas">Ver Tarjetas</a>
            <br/>
            <button class="dropdown-btn">Ingresos y Gastos
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-container">
                <a href="#">Actualizar</a>
                <a href="#">Informe</a>
            </div>
    </div>
    
  );

}

export default VerticalMenu;
