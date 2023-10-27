'use client'



import React, { useState } from "react";
import './signup.css';
import Link from "next/link";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const nameRegex = /^[A-Za-z\s]+$/; // Permite espacios
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

  const usersList = JSON.parse(localStorage.getItem("users")) || [];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (firstName === "" || lastName === "" || username === "" || password === "" || confirmPassword === "" || email === "") {
      alert("Por favor, complete todos los campos.");
    } else if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      alert("El nombre y apellido deben contener solo letras y espacios.");
    } else if (!passwordRegex.test(password) || !passwordRegex.test(confirmPassword)) {
      alert("La contraseña debe tener al menos 5 caracteres, incluyendo una letra, un dígito y un carácter especial.");
    } else if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      setPassword("");
      setConfirmPassword("");
    } else {
      const userId = usersList.length + 1;
      const user = {
        id: userId,
        firstName,
        lastName,
        username,
        password,
        email,
        cards: []
      };

      usersList.push(user);
      localStorage.setItem("users", JSON.stringify(usersList));
      console.log("Lista de usuarios actualizada:", usersList);
      // Aquí puedes llamar a tu función registrarUsuario si es necesario
      // registrarUsuario(email, password, firstName, lastName, username);
      window.location.href = `/Congrats?userId=${userId}`;
    }
  };

  return (
    <div className="register-container">
      <h1>Sign Up for</h1>
      <img src="https://cdn.discordapp.com/attachments/1025977476096204862/1162442035278659604/logo-name.jpeg?ex=653bf382&is=65297e82&hm=530a33fa80ce87770b863c679e0da9e2cfa806c99cfea4f8bf423de6a7ee639f&" alt="" />

      <input
        className="register-input"
        type="text"
        name="firstName"
        placeholder="First Name"
        value={firstName}
        onChange={(event) => {
          if (nameRegex.test(event.target.value)) {
            setFirstName(event.target.value);
          }
        }}
      />

      <input
        className="register-input"
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={lastName}
        onChange={(event) => {
          if (nameRegex.test(event.target.value)) {
            setLastName(event.target.value);
          }
        }}
      />

      <input
        className="register-input"
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <input
        className="register-input"
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <input
        className="register-input"
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <input
        className="register-input"
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(event) => {
          setConfirmPassword(event.target.value);
        }}
      />
      <button className="register-button" onClick={handleSubmit}>
        Create your new Account
      </button>
      <hr></hr>

      <Link href="/Login" className="already-button">
        Already have an account?
      </Link>

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
