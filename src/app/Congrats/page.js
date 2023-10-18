'use client'
import React from "react";
/*import { Link } from "react-router-dom";*/
import Link from "next/link";
import myImage from "../../../imagenes/logo-name.jpeg";
import "./congrats.css";
const Congratulations = () => {
    return (
        <div className="container">
            <h1>Congratulations!</h1><br/>
            <p>You have successfully signed up for.</p>
            <img src={myImage} alt="" />
            <button className="login-button">
                
                <Link href="/Login" className="signin-link">
                    Log in
                </Link>
            </button>
        </div>
        );
        };
export default Congratulations;