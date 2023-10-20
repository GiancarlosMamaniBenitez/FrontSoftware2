'use client'

import React, { useState } from "react";
import './login.css';
import Link from "next/link";
import {auth} from '../../config/Backend'
import { signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function ingresarUsuario(email,password) {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("usuario ingresado")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      
      const uid = user.uid;
      console.log(uid)
      // ...
    } else {
      // User is signed out
      // ...
      console.log("Usuario sin logear")
    }
  });
/*
    signInWithEmailAndPassword(auth, email, password)
      .then(data => {
        console.log(data,"authdata")
      });  
    const infoUsuario = createUserWithEmailAndPassword(auth,email,password)
    .then((usuarioFirebase)=>{
      return usuarioFirebase
    });
    console.log(infoUsuario?.uid);*/
    
  }
  
  const generateRandomPassword = () => {
    // Generar una contraseña aleatoria de 5 dígitos
    const newPassword = Math.floor(10000 + Math.random() * 90000).toString();
    setNewPassword(newPassword);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    ingresarUsuario(email, password)
      window.location.href = "/Home";
  };

  return (
    <div className="login-container">
      <img src="https://cdn.discordapp.com/attachments/1025977476096204862/1162442034884390962/logo-colored.jpeg?ex=653bf382&is=65297e82&hm=89132243369e55b33a9c51123383eeaa0f1f95e3116481e49d82043faab9a0fc&" alt="" />
      <input className="login-input" type="text" name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
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
  );
};

export default Login;
