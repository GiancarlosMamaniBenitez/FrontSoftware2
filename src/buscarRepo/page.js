'use client'
import { useEffect } from 'react';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../app/home.css';
import { useRouter } from 'next/navigation';

import NavBar from '@/Components/NavBar';
//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default function Home() {

  const [sesion , setSesion] = useState({});
// Obtén el nombre del usuario desde el Local Storage

const userName = sesion ? sesion.nombres : ""; // Obtén el firstName del usuario
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const router = useRouter();

  useEffect(() => {
    // Verifica si el usuario ha iniciado sesión
    let sesionGuardada = localStorage.getItem("sesion");
        if(sesionGuardada == undefined){
          
            router.push('/')
        }
        setSesion(JSON.parse(sesionGuardada))
        
          const mensaje = 'Bienvenido de vuelta! 😉';
          notifySuccess(mensaje);
          
        
        console.log(sesion)
  }, []);

  const notifySuccess = (mensaje) => {
    toast(mensaje, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const handleLogout = () => {
    // Elimina la marca o token de autenticación del Local Storage
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("currentUser"); // Elimina los datos del usuario actual

    // Redirige al usuario a la página de inicio de sesión
    window.location.href = "/Login";
  };

  return (
    <div>
      <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion}/>
      
      
      <div className={`container${isSidebarOpen ? '-shifted' : ''}`}>
      <h1 className="tituloReporte">Reportes</h1>

            <div className="card mx-auto">
            <label className="subtituloReporte">Tarjeta:</label>
            <CardSelect
                selectedCard={selectedCard}
                userCards={listcards.filter((e) => e.id_usuario == sesion.id)}
                handleSelectedCardChange={handleSelectedCardChange}
            />
            </div>
          
          
        
        
        
      </div>
      
    </div>
  );
}

