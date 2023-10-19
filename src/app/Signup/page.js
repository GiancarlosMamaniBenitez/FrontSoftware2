'use client'
import React, { useState } from "react";
import './login.css';
import Link from "next/link";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar credenciales y autenticar al usuario
    const isAuthenticated = true; // Reemplaza con tu lógica de autenticación

    if (isAuthenticated) {
      // Al autenticar con éxito, establecer una marca en el Local Storage
      localStorage.setItem("userLoggedIn", "true");

      // Redirigir al usuario a la página de inicio (Home)
      window.location.href = "/Home";
    } else {
      alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
  };
  return (
    <>
    <div className="login-container">
      <img src="https://cdn.discordapp.com/attachments/1025977476096204862/1162442034884390962/logo-colored.jpeg?ex=653bf382&is=65297e82&hm=89132243369e55b33a9c51123383eeaa0f1f95e3116481e49d82043faab9a0fc&" alt="" />
      <input className="login-input" type="text" name="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
      <input className="login-input" type="password" name="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <button className="login-button" onClick={handleSubmit}>
        Sign in
      </button>
      <hr></hr>
      <Link href="/ForgotPassword" className="forgotpassword">Forgot password?</Link>
      <hr></hr>
      <button className="create-button">
        <Link href="/Signup" className="create-link">Create new account</Link>
      </button>
    </div>
    </>
  );
};

export default Login;


