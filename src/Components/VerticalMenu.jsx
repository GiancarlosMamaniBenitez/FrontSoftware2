import React from 'react';
import { Nav } from 'react-bootstrap';
import menu from "./menu.css";


import Link from 'next/link';
import Button from 'react-bootstrap/Button';

const VerticalMenu = () => {
  return (

    <Nav variant="pills" className='Vertical'>
      <Nav.Item>
      <Button className="button-link">
        <Link href="../app/page.js">INICIO</Link>
      </Button>
      <br></br>
      <Button className="button-link">
        <Link href="/">DATOS DE PERFIL</Link>
      </Button>
      <br></br>
      <Button className="button-link">
        <Link href="/">VER TARJETAS</Link>
      </Button>
      <br></br>
      <Button className="button-link">
        <Link href="/">INGRESOS Y GASTOS</Link>
      </Button>
      <br></br>
      <Button className="button-link">
        <Link href="/">ACTUALIZAR</Link>
      </Button>
      <br></br>
      <Button className="button-link">
        <Link href="/">INFORME</Link>
      </Button>
      <br></br>
      </Nav.Item>
      
    </Nav>
    /*<div className="sidenav">
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
    </div>*/
    
  );

}

export default VerticalMenu;
