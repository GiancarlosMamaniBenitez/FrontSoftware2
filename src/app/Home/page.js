'use client'


import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './page.css';
import MenuNuevo from '@/Components/MenuNuevo';
import NavBarInicio from '../NavBarInicio';
export default function Home() {
  

  

  // Obtén el nombre del usuario desde el Local Storage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userName = currentUser ? currentUser.username : "";

  return (
    <div>
      
      <div className='container'>
        
        <div>
        <MenuNuevo /> 
          {currentUser ? (
            <div className="about-us">
              <h1>Bienvenido, {userName} </h1>
              <p>Ahora puedes mejorar la gestión de tus controles de gastos de tu tarjeta de crédito o débito con WiseWallet. Nuestra plataforma te brinda métodos financieros para simplificar la gestión de tus finanzas.</p>
              
              
            </div>
          ) : (
            
             <div className="about-us">
              <NavBarInicio/>
              <h1>Bienvenido a WiseWallet</h1>
              <p>Por favor, inicia sesión para acceder a nuestros servicios.</p>
            </div>
            
          )}
        </div>
        <div className="about-us">
        <div className="features">
          <div className="feature">
          <Image src="/Foquito.png" width="100" height="100" alt="Foquito" />
            <h3>Simplicidad en la Complejidad</h3>
            <p>Con WiseWallet, decir adiós al caos financiero es más fácil que nunca. Nuestra plataforma está diseñada para simplificar la gestión de múltiples tarjetas y cuentas, permitiéndote mantener un control total con unos pocos clics.</p>
          </div>

          <div className="feature">
          <Image src="/GraficoBarras.jpg" width="100" height="100" alt="GraficoBarras" />


            <h3>Informes Mensuales Personalizados</h3>
            <p>¿Necesitas un análisis detallado de tus finanzas mensuales? WiseWallet genera informes automáticos basados en tus datos, proporcionándote una visión clara de tus patrones de gastos e ingresos.</p>
          </div>

          <div className="feature">
          <Image src="/Finanzas.png" width="100" height="100" alt="Finanzas" />
            <h3>Seguridad en Primer Lugar</h3>
            <p>Entendemos la importancia de la seguridad de tus datos financieros. Utilizamos las últimas tecnologías de encriptación para garantizar que tu información esté siempre protegida.</p>
          </div>
        </div>
            </div>
        <div className="about-us">
          <h2>Sobre Nosotros</h2>
          <p>En WiseWallet, nuestro objetivo es simplificar la gestión financiera y brindarte herramientas poderosas para controlar tus finanzas. Creemos en la simplicidad, la seguridad y la transparencia.</p>
        </div>
      </div>

      
    </div>
  );
}
