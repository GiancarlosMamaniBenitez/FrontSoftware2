'use client'


import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./perfil.css";
import NavBar from "@/Components/NavBar";
import UsuariosApi from "../api_fronted/usuarios";
import { useRouter } from 'next/navigation';
//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
const Profile = () => {

  const router = useRouter()
  const [nombres, setFirstName] = useState("");
  const [apellidos, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [contrasenia, setPassword] = useState("*******");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [sesion , setSesion] = useState({});
  const [usuarios, setUsuarios ] = useState([]);
  
  const notifyError = (mensaje) => {
    toast.error( mensaje ,{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }

  const notifySuccess = (mensaje) => {
    toast.success(mensaje , {
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
  
  useEffect(() => {
    // Verifica si el usuario ha iniciado sesión
    let sesionGuardada = localStorage.getItem("sesion");
        if(sesionGuardada == undefined){
          
            router.push('/Login')
        }
        setSesion(JSON.parse(sesionGuardada))
        console.log(sesion)
  }, []);
  // Obtén la información del usuario desde el Local Storage
  useEffect(() => {
    const authenticatedUser = JSON.parse(localStorage.getItem("sesion"));

    if (authenticatedUser) {
      setFirstName(authenticatedUser.nombres);
      setLastName(authenticatedUser.apellidos);
      setUsername(authenticatedUser.username);
      setPassword(authenticatedUser.contrasenia)
      setEmail(authenticatedUser.email);
    }
    console.log(authenticatedUser.nombres)
  }, []);

  const handleEdit = () => {
    // Habilitar la edición de campos
    setIsEditing(true);
  };

  const handleSave = async () => {
    // Obtén el usuario autenticado del Local Storage
    const authenticatedUser = JSON.parse(localStorage.getItem("sesion"));

    if (authenticatedUser) {
      // Modifica las propiedades del objeto
      authenticatedUser.nombres = nombres;
      authenticatedUser.apellidos = apellidos;
      authenticatedUser.username = username;
      authenticatedUser.contrasenia = contrasenia;
      authenticatedUser.email = email;

      // Guarda el objeto modificado de vuelta en el Local Storage
      console.log(authenticatedUser)
      
      try {
        // Realiza la solicitud POST al backend para registrar el nuevo usuario utilizando la función personasApi
        const response = await UsuariosApi.update(authenticatedUser.id,authenticatedUser);
        handleOnLoadAct();
        //poner aqui el mensaje de la notificacion
        const mensaje = 'Actualización exitosa!'
        //en caso de ser un error poner notifyError
        notifySuccess(mensaje)
  
      } catch (error) {
         }
    
    }
    
    // Deshabilita la edición de campos
    setIsEditing(false);
  };
  const handleOnLoadAct = async () =>{
    const result = await UsuariosApi.findAll()
    const resultData = await UsuariosApi.findOne(sesion.id)
    setUsuarios(result.data)
    setSesion(resultData.data)
    localStorage.setItem('sesion', JSON.stringify(resultData.data))
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro que desea eliminar su usuario?")

    if (confirmDelete){
      localStorage.removeItem("currentUser");
      const result = await UsuariosApi.remove(sesion.id)
      alert("Usuario eliminado correctamente!");
      router.push('/Login');
      
    }
  }
  
  return (
    <div>
    
            <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion}/>
            <div>
            <ToastContainer></ToastContainer>
            </div>  
      <div className={`profile-container${isSidebarOpen ? '-shifted' : ''}`}>
      
      <h1>Perfil</h1>
      <div className="profile-details">
        <label>Nombre:</label>
        {isEditing ? (
          <input
            type="text"
            value={nombres}
            onChange={(e) => setFirstName(e.target.value)}
          />
        ) : (
          <span>{nombres}</span>
        )}
      </div>
      <div className="profile-details">
        <label>Apellido:</label>
        {isEditing ? (
          <input
            type="text"
            value={apellidos}
            onChange={(e) => setLastName(e.target.value)}
          />
        ) : (
          <span>{apellidos}</span>
        )}
      </div>
      <div className="profile-details">
        <label>Usuario:</label>
        {isEditing ? (
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        ) : (
          <span>{username}</span>
        )}
      </div>
      <div className="profile-details">
        <label>Contraseña:</label>
        {isEditing ? (
          <input
            type="text"
            value={contrasenia}
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : (
          <span>{generarAsteriscos(contrasenia)}</span>
        )}
      </div>
      <div className="profile-details">
        <label>Correo:</label>
        {isEditing ? (
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <span>{email}</span>
        )}
      </div>
      <div className="profile-actions">
        {isEditing ? (
          <button className="save-button" onClick={handleSave}>
            Guardar
          </button>
        ) : (
          <button className="edit-button" onClick={handleEdit}>
            Editar
          </button>
        )}
        <Link href="/">
          <button className="edit-button">Regresar</button>
        </Link>
          <button className ="eliminar-button" onClick ={handleDelete}>Eliminar Cuenta</button>
      </div>
    </div>
    
    </div>
  );
};

function generarAsteriscos(inputString) {
  // Check if the input is a string
  if (typeof inputString === 'string') {
    // Use inputString.length to get the length of the string
    return Array.from({ length: inputString.length }, () => '*').join('');
  } else {
    // Handle invalid input
    return 'Invalid input. Please provide a string.';
  }
}

export default Profile;
