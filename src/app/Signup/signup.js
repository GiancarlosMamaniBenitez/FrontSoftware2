import React, { useState } from "react";
import { Link } from "react-router-dom";
import './signup.css';
import myImage from "../../../imagenes/logo-colored.jpeg";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [email, setEmail] =  useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    confirmPasswordMatch();
    console.log("Registering with username: " + username + ", password: " + password + ", and confirm password: " + confirmPassword);
  };
  const confirmPasswordMatch = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="register-container">
      <h1>Sign Up for</h1>
      <img src={myImage} alt="" />

      <input className="register-input" type="text" name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <input className="register-input" type="text" name="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
      <input className="register-input" type="password" name="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <input className="register-input" type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
      <button className="register-button" onClick={handleSubmit}><Link to="../Congrats/congrats.js" className="create-link" >Create your new Account</Link></button>
      <hr></hr>
     
      <button className="already-button" onClick={handleSubmit}><Link to="/" className="already-link">Already have an account?</Link></button>
      <hr></hr>
      <a className="terms">By selecting Create your new Account, you agree to our <Link to="/terms-and-conditions" className="terms">Terms and Conditions</Link></a>
    </div>
  );
};

export default SignUp;