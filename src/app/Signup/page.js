'use client'
import React, { useState } from "react";
import Link from "next/link";
/*import { Link } from "react-router-dom";*/
import './signup.css';


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
      <img src="https://cdn.discordapp.com/attachments/1025977476096204862/1162442035278659604/logo-name.jpeg?ex=653bf382&is=65297e82&hm=530a33fa80ce87770b863c679e0da9e2cfa806c99cfea4f8bf423de6a7ee639f&" alt="" />

      <input className="register-input" type="text" name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <input className="register-input" type="text" name="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
      <input className="register-input" type="password" name="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <input className="register-input" type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
      <button className="register-button" onClick={handleSubmit}>
        <Link href="/Congrats" className="create-link">
          Create your new Account
        </Link>
        
      </button>
      <hr></hr>
     
      <button className="already-button" onClick={handleSubmit}>
        <Link href="/" className="already-link">
          Already have an account?
        </Link>
      </button>
      <hr></hr>
      <a className="terms">By selecting Create your new Account, you agree to our <a> </a>
        <Link href="./Terms" className="terms">
          Terms and Conditions
        </Link>
      </a>
    </div>
  );
};

export default SignUp;