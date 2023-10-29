'use client'


import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./perfil.css";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("*******");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
const currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  window.location.href = "/";
}
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
    // Obtén el usuario autenticado del Local Storage
    const authenticatedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (authenticatedUser) {
      // Modifica las propiedades del objeto
      authenticatedUser.firstName = firstName;
      authenticatedUser.lastName = lastName;
      authenticatedUser.username = username;
      authenticatedUser.email = email;

      // Guarda el objeto modificado de vuelta en el Local Storage
      localStorage.setItem("currentUser", JSON.stringify(authenticatedUser));
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
          <span>{firstName}</span>
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
          <span>{lastName}</span>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : (
          <span>{password}</span>
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
