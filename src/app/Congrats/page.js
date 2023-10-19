'use client'
import React from "react";
/*import { Link } from "react-router-dom";*/
import Link from "next/link";
import "./congrats.css";
const Congratulations = () => {
    return (
        <div className="container">
            <h1>Congratulations!</h1><br/>
            <p>You have successfully signed up for.</p>
            <img src="https://cdn.discordapp.com/attachments/1025977476096204862/1162442035278659604/logo-name.jpeg?ex=653bf382&is=65297e82&hm=530a33fa80ce87770b863c679e0da9e2cfa806c99cfea4f8bf423de6a7ee639f&" alt="" />
            <button className="login-button">
                
                <Link href="/Login" className="signin-link">
                    Log in
                </Link>
            </button>
        </div>
        );
        };
export default Congratulations;
