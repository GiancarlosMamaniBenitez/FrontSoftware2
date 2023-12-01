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
import ModalInicio from '@/Components/ModalInicio.jsx';
import MetaApi from '@/app/api_fronted/meta';
import LimitgastoApi from './api_fronted/Limitgasto';
export default function Home() {

      const [sesion , setSesion] = useState({});
    // Obtén el nombre del usuario desde el Local Storage

    const userName = sesion ? sesion.nombres : ""; // Obtén el firstName del usuario
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    const [listMetas, setListMetas] = useState([]);
    const [listLimit, setListLimit] = useState([]);

    const [showModal, setShowModal] = useState(true);
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
      useEffect(() => {

        LoadData()
        getsesionMeta(listMetas, sesion)
        
        
      }, []);

      const LoadData = async () => {
            
          
        const result6 = await MetaApi.findAll()
        const result7 = await LimitgastoApi.findAll()
        
        setListMetas(result6.data)
        setListLimit(result7.data)



      }
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
    const getsesionMeta =  () =>{
      const meta = listMetas.find((e) => e.id_usuario == sesion.id);
      console.log("meta log",meta);
      if (meta) {

          setMetaUsuario(meta.monto);
          
          
          
        }
        console.log("meta log",meta);
        console.log("lista metas",listMetas);
  console.log("sesion id",sesion.id);

      }

//fechaArray = Array.from(new Set(ingresosAplanados.filter(ingreso => ingreso.id_tarjeta === selectedCardId).map(ingreso => (ingreso.fecha_ingresos || " ")  )));
        const listaAplanado = listMetas.flat();
        const montoArrayFiltered = Array.from(
          new Set(listaAplanado.filter((item) => item.id_usuario === sesion.id).map((item) => item.monto || ""))
        );
        console.log("monto aplanado",montoArrayFiltered);


        const monto123 = montoArrayFiltered.flat();
        console.log("monto123",monto123);
        const limiteAplanado = listLimit.flat();
        const limiteArrayFiltered = Array.from(
          new Set(limiteAplanado.filter((item) => item.id_usuario === sesion.id).map((item) => item.monto || ""))
        );
        const limite456 = limiteArrayFiltered.flat();
        console.log("limite456",limite456);
        const closeModal = () => {
          setShowModal(false);};

  return (
    <div>
      <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion}/>
      {sesion ? (<ToastContainer></ToastContainer>):(<div></div>)}
      
      <div className={`container${isSidebarOpen ? '-shifted' : ''}`}>
      
      <div>
          {showModal && <ModalInicio closeModal={closeModal} monto123={monto123} limite456={limite456}  />}
          </div>
          {sesion ? (
            <div className="about-us">
              
              <h1>{`Bienvenido, ${userName}`}</h1>
              <p>Ahora puedes mejorar la gestión de tus controles de gastos de tu tarjeta de crédito o débito con WiseWallet. Nuestra plataforma te brinda métodos financieros para simplificar la gestión de tus finanzas.</p>
            </div>
              
          ) : (
            <div className="about-us">
              <h1>Bienvenido a WiseWallet</h1>
              <p>Por favor, inicia sesión para acceder a nuestros servicios.</p>            
            </div>
          )}
        
        <div className="about-us">
          <div className="features">
            <div className="feature">
              <div className='imagen'>
              <Image src="/Foquito.png" width="100" height="100" alt="Foquito" />
              </div>
              <h3>Simplicidad en la Complejidad</h3>
              <p>Con WiseWallet, decir adiós al caos financiero es más fácil que nunca. Nuestra plataforma está diseñada para simplificar la gestión de múltiples tarjetas y cuentas, permitiéndote mantener un control total con unos pocos clics.</p>
            </div>
            <div className="feature">
            <div className='imagen'>
              <Image src="/GraficoBarras.jpg" width="100" height="100" alt="GraficoBarras" />
              </div>
              <h3>Informes Mensuales Personalizados</h3>
              <p>¿Necesitas un análisis detallado de tus finanzas mensuales? WiseWallet genera informes automáticos basados en tus datos, proporcionándote una visión clara de tus patrones de gastos e ingresos.</p>
            </div>
            <div className="feature">
            <div className='imagen'>
              <Image src="/Finanzas.png" width="100" height="100" alt="Finanzas" />
              </div>
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

