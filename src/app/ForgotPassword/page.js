'use client'


import React, { useState } from "react";
import './forgot.css';
import Link from "next/link";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Aquí puedes generar una nueva contraseña aleatoria de 5 dígitos
    const newPassword = generateRandomPassword(5);

    const usersList = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = usersList.findIndex((user) => user.username === username);

    if (userIndex !== -1) {
      // Usuario encontrado, actualiza su contraseña
      usersList[userIndex].password = newPassword;

      // Almacena la lista de usuarios actualizada
      localStorage.setItem("users", JSON.stringify(usersList));
      alert("Nueva contraseña generada: " + newPassword);
    } else {
      alert("El usuario no se encontró. Verifica el nombre de usuario.");
    }

    // Redirigir al usuario a la página de inicio de sesión una vez completado el proceso.
    window.location.href = "/Login";
  };

  // Función para generar una contraseña aleatoria
  const generateRandomPassword = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }
    return newPassword;
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <input
          className="forgot-password-input"
          type="text"  
          name="username"
          placeholder="Username" 
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <button className="forgot-password-button" type="submit">
          Reset Password
        </button>
        <Link href="/Login" className="return-link">
          Return to Login
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
