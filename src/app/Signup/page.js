'use client'

import Link from "next/link";
import React, { useState } from "react";
import './signup.css';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  
  // Inicializa el contador en 1
  const [userCounter, setUserCounter] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "" || password === "" || confirmPassword === "" || email === "") {
      alert("Por favor, complete todos los campos.");
    } else if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      setPassword("");
      setConfirmPassword("");
    } else {
      // Genera un ID único para el usuario utilizando el contador
      const userId = userCounter;

      // Almacena los datos en el Local Storage con el ID del usuario
      localStorage.setItem("user_" + userId, JSON.stringify({ id: userId, username, password, email }));

      // Incrementa el contador para el próximo usuario
      setUserCounter(userCounter + 1);

      // Redirige al usuario a la página de confirmación después de un registro exitoso
      window.location.href = `/Congrats?userId=${userId}`;
    }
  };
  return (
    <div className="register-container">
      <h1>Sign Up for</h1>
      <img src="https://cdn.discordapp.com/attachments/1025977476096204862/1162442035278659604/logo-name.jpeg?ex=653bf382&is=65297e82&hm=530a33fa80ce87770b863c679e0da9e2cfa806c99cfea4f8bf423de6a7ee639f&" alt="" />

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
