'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./perfil.css";
import MenuNuevo from "@/Components/MenuNuevo";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("******");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Obtén la información del usuario desde el Local Storage
  useEffect(() => {
    const authenticatedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (authenticatedUser) {
      setFirstName(authenticatedUser.firstName);
      setLastName(authenticatedUser.lastName);
      setUsername(authenticatedUser.username);
      setEmail(authenticatedUser.email);
    }
  }, []);

  const handleEdit = () => {
    // Habilitar la edición de campos
    setIsEditing(true);
  };

  const handleSave = () => {
    // Guardar los cambios en el Local Storage
    const authenticatedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (authenticatedUser) {
      authenticatedUser.firstName = firstName;
      authenticatedUser.lastName = lastName;
      authenticatedUser.username = username;
      authenticatedUser.email = email;

      localStorage.setItem("currentUser", JSON.stringify(authenticatedUser));
    }

    // Deshabilitar la edición de campos
    setIsEditing(false);
  };

  return (
    <div>
      <MenuNuevo/>
    <div className="profile-container">
      <h1>Tu perfil</h1>
      <div className="profile-details">
        <label>Nombre:</label>
        {isEditing ? (
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        ) : (
          <span>{firstName}</span>
        )}
      </div>
      <div className="profile-details">
        <label>Apellido:</label>
        {isEditing ? (
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        ) : (
          <span>{lastName}</span>
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
        <span>*******</span>
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
        <Link href="/Home">
          <button className="edit-button">Regresar</button>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Profile;
