'use client'
import React, { useState } from "react";
import Link from 'next/link';
import './login.css';
import myImage from "../../../imagenes/logo-colored.jpeg";
/*
import { Link } from "react-router-dom";
*/

import SignUp from "../Signup/page";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    
    
    console.log("Loging with username: " + username + ", password: " + password );
  };
  
  return (
    <div className="login-container">
      <img src={myImage} alt="" />
      <input className="login-input" type="text" name="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
      <input className="login-input" type="password" name="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <button className="login-button" onClick={handleSubmit}>
        <Link href="../Home.js" className="signin-link">Sign in</Link>
      </button>
      <hr></hr>
        <Link href="../ForgotPassword" className="forgotpassword">Forgot password? </Link>
      <hr></hr>
      <button className="create-button" onClick={handleSubmit}>
        <Link href="../Signup" className="create-link">Create new account</Link>
      </button>
      
    </div>
    /*
      <div className="login-container">
      <img src={myImage} alt="" />
      <input className="login-input" type="text" name="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
      <input className="login-input" type="password" name="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <button className="login-button" onClick={handleSubmit}><Link to="../Home.js" className="signin-link">Sign in</Link></button>
      <hr></hr>
      <Link to="/changepassword" className="forgotpassword">Forgot password? </Link>
      <hr></hr>
      <button className="create-button" onClick={handleSubmit}><Link to="../Signup/signup.js" className="create-link">Create new account</Link></button>
      
    </div>
    */
  );
};

export default Login;