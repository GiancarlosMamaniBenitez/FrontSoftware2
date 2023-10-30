'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./perfil.css";
import UsuariosApi from '../api_fronted/usuarios';

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [sesion , setSesion] = useState({});
  const [usuarios, setUsuarios ] = useState([]);
  const router = useRouter();


  const handleOnLoad = async () => {
    const result = await UsuariosApi.findAll()
    setUsuarios(result.data)
    
    const authenticatedUser = localStorage.getItem("sesion");
    console.log(JSON.parse(authenticatedUser))
    if(authenticatedUser == undefined){
      router.push('/')
    }
    setSesion(JSON.parse(authenticatedUser))
    
  
  }

  const handleOnLoadAct = async () =>{
    const result = await UsuariosApi.findAll()
    const resultData = await UsuariosApi.findOne(sesion.id)
    setUsuarios(result.data)
    setSesion(resultData.data)
    localStorage.setItem('sesion', JSON.stringify(resultData.data))

  }
  useEffect(() => {
    handleOnLoad()
  }, []);

  const handleEdit = () => {
    // Habilitar la edición de campos
    setIsEditing(true);
  };
  
  const handleSave = async (event) => {
    event.preventDefault();
    const userCambio = {
        
      nombres: firstName,
      apellidos: lastName,

      username: username,
      contrasenia: password,
      email: email,
       // Agregar un array para almacenar las tarjetas asociadas al usuario
    };

    try {
      // Realiza la solicitud POST al backend para registrar el nuevo usuario utilizando la función personasApi
      const response = await UsuariosApi.update(sesion.id, userCambio)
      handleOnLoadAct()
      // Comprueba el resultado de la solicitud
        if (response && response.status === 200) {
            // Registro exitoso, redirige a la página de inicio de sesión
            alert('Actualización exitosa!');
            
        
        } 
        else {
            // Manejo de errores en caso de que algo salga mal en el backend
            alert('Error al registrar usuario2');
        }
    } catch (error) {
      // Manejo de errores en caso de problemas de conexión o errores en el backend
      alert('Error al registrar usuario');
    }
    // Deshabilita la edición de campos
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      <div className="profile-details">
        <label>First Name:</label>
        {isEditing ? (
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        ) : (
          <span>{sesion.nombres}</span>
        )}
      </div>
      <div className="profile-details">
        <label>Last Name:</label>
        {isEditing ? (
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        ) : (
          <span>{sesion.apellidos}</span>
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
          <span>{sesion.username}</span>
        )}
      </div>
      <div className="profile-details">
        <label>Password:</label>
        {isEditing ? (
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : (
          <span>{sesion.contrasenia}</span>
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
          <span>{sesion.email}</span>
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
