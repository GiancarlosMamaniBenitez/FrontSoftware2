
'use client'

import Link from "next/link";
import React, { useState } from "react";
import './signup.css';

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  // Obtén la lista de usuarios del Local Storage
  const usersList = JSON.parse(localStorage.getItem("users")) || [];

  const handleSubmit = (event) => {
    event.preventDefault();


    if (firstName === "" || lastName === "" || username === "" || password === "" || confirmPassword === "" || email === "") {

      alert("Por favor, complete todos los campos.");
    } else if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      setPassword("");
      setConfirmPassword("");
    } else {
      // Genera un ID único para el usuario
      const userId = usersList.length + 1;

      // Crea un nuevo usuario
      var user = {
        id: userId,

        firstName,
        lastName,

        username,
        password,
        email,
        cards: [] // Agregar un array para almacenar las tarjetas asociadas al usuario
      };

      // Agrega el usuario a la lista de usuarios
      usersList.push(user);

      // Almacena la lista actualizada en el Local Storage
      localStorage.setItem("users", JSON.stringify(usersList));

      // Muestra la lista de usuarios en la consola
      console.log("Lista de usuarios actualizada:", usersList);

      // Redirige al usuario a la página de confirmación después de un registro exitoso
      window.location.href = `/Congrats?userId=${userId}`;
    }
  };

  return (
    <div className="register-container">
      <h1>Sign Up for</h1>
      <img src="https://cdn.discordapp.com/attachments/1025977476096204862/1162442035278659604/logo-name.jpeg?ex=653bf382&is=65297e82&hm=530a33fa80ce87770b863c679e0da9e2cfa806c99cfea4f8bf423de6a7ee639f&" alt="" />

      <input className="register-input" type="text" name="firstName" placeholder="First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
      <input className="register-input" type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
      <input className="register-input" type="text" name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <input className="register-input" type="text" name="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
      <input className="register-input" type="password" name="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <input className="register-input" type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
      <button className="register-button" onClick={handleSubmit}>
        Create your new Account
      </button>
      <hr></hr>
      <button className="already-button">
        <Link href="/Login">
          Already have an account?
        </Link>
      </button>
      <hr></hr>
      <a className="terms">By selecting Create your new Account, you agree to our <a> </a>
        <Link href="./Terms">
          Terms and Conditions
        </Link>
      </a>
    </div>
  );
};

export default SignUp;

