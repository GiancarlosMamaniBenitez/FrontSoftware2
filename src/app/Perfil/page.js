'use client'


import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./perfil.css";
import UsuariosApi from "../api_fronted/usuarios";
const Profile = () => {
  const [nombres, setFirstName] = useState("");
  const [apellidos, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [contrasenia, setPassword] = useState("*******");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
        console.error("Error en la solicitud: ", error);
    alert("Error al actualizar usuario. Consulta la consola para más detalles.");
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
  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      <div className="profile-details">
        <label>First Name:</label>
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
        <label>Last Name:</label>
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
        <label>Username:</label>
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
        <label>Password:</label>
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
        <label>Email:</label>
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
            Save
          </button>
        ) : (
          <button className="edit-button" onClick={handleEdit}>
            Edit
          </button>
        )}
        <Link href="/">
          <button className="edit-button">Regresar</button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
