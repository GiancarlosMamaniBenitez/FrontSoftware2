'use client'


import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./perfil.css";
import NavBar from "@/Components/NavBar";
import UsuariosApi from "../api_fronted/usuarios";
const Profile = () => {
  const [nombres, setFirstName] = useState("");
  const [apellidos, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [contrasenia, setPassword] = useState("*******");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [sesion , setSesion] = useState({});
  const [usuarios, setUsuarios ] = useState([]);
  
  useEffect(() => {
    // Verifica si el usuario ha iniciado sesión
    let sesionGuardada = localStorage.getItem("sesion");
        if(sesionGuardada == undefined){
          alert("No hya sesion guardada")
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
        
        // Comprueba el resultado de la solicitud
          if (response && response.status === 200) {
              // Registro exitoso, redirige a la página de inicio de sesión
              alert('Actualización exitosa!');
              router.push('/Congrats');
          } else {
              // Manejo de errores en caso de que algo salga mal en el backend
              alert('Error al actualizar usuario');
          }
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

  const handleDelete = () => {
    const confirmDelete = window.confirm("¿Estás seguro que desea eliminar su usuario?")

    if (confirmDelete){
      localStorage.removeItem("currentUser");
      router.push('/Login');
    }
  }
  return (
    <div>
            <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion}/>

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
          <input
          type="password"
          value={contrasenia}
          onChange={(e) => setPassword(e.target.value)}
        />
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
          <button className ="eliminar-button" onClick ={handleDelete}>Eliminar Usuario</button>
      </div>
    </div>
    </div>
  );
};

export default Profile;
