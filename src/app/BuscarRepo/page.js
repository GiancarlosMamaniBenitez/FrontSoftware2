'use client'
import { useEffect } from 'react';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '@/app/home.css';
import { useRouter } from 'next/navigation';
import TarjetasApi from "../api_fronted/tarjetas";
import IngresosApi from "../api_fronted/ingresos";
import GastosApi from "../api_fronted/gastos";
import UsuariosApi from "../api_fronted/usuarios";
import CategoriasApi from "../api_fronted/categorias";
import MetaApi from "../api_fronted/meta";
import LimitgastoApi from "../api_fronted/Limitgasto";
import NavBar from '@/Components/NavBar';
//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import CardSelect from '@/Components/CardSelect';
import ReportesApi from "../api_fronted/reportes";
export default function Home() {

  const [sesion , setSesion] = useState({});
// Obtén el nombre del usuario desde el Local Storage
const [categorias, setCategorias] = useState([])
const [listcards, setListCards] = useState([]);
const userName = sesion ? sesion.nombres : ""; // Obtén el firstName del usuario
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const router = useRouter();
const [ListaIngresos,setListaIngresos] = useState([]);
const [listGastos, setListGastos] = useState([]);
const [ selectedCard, setSelectedCard] = useState("");
const[listLimit, setListLimit] = useState([]);
const[listCategorias, setListCategorias] = useState([]);
const [meta, setlistMeta] = useState([]);
const [listUsuarios, setListUsuarios] = useState([]);
const [ listReport , setListReport ] = useState([])
const LoadData = async() =>{
  const result = await TarjetasApi.findAll();
  const result1  = await IngresosApi.findAll();
  const result2 = await GastosApi.findAll();
  const result3 = await UsuariosApi.findAll();
  const result5 = await CategoriasApi.findAll();
  const result6 = await MetaApi.findAll();
  const result7 = await LimitgastoApi.findAll();
  const result8 = await ReportesApi.findAll();
  setListCards(result.data)
  setListaIngresos(result1.data)
  setListGastos(result2.data)
  setListUsuarios(result3.data)
  setListCategorias(result5.data)
  setlistMeta(result6.data)
  setListLimit(result7.data)
  setListReport(result8.data)
  

 
}
  
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
  const handleSelectedCardChange = (event) => {  
    
   
    const selectedCardNumber = event.target.value;
    const selectedCardData = listcards.find((card) => card.number === selectedCardNumber);
    setUserCards(selectedCardData)
    setSelectedCard(selectedCardNumber);
    
    const listarepo = listReport.filter((e) => e.id_tarjeta === selectedCardData.id);
    console.log(listarepo)
    setUsuarioRepo(listarepo)
  

};

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

