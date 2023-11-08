'use client'
import React from "react";
/*import { Link } from "react-router-dom";*/
import Link from "next/link";
import "./congrats.css";
const Congratulations = () => {
    return (
        <div className="container-congrats">
            <h1>Congratulations!</h1><br/>
            <p>You have successfully signed up for.</p>
            <img src="https://cdn.discordapp.com/attachments/1025977476096204862/1162442035278659604/logo-name.jpeg?ex=6557a302&is=65452e02&hm=ed32a4110d4de5892a644263daa46d8d40dfe76039a8a03405ccbfbd00063801&" alt="" />
            <button className="login-button">
                
                <Link href="/Login" className="signin-link">
                    Log in
                </Link>
            </button>
        </div>
        );
        };
export default Congratulations;
