
import React from "react";
import { Link } from "react-router-dom";
import myImage from "./images/logo-name.jpeg";
import "./congrats.css";
const Congratulations = () => {
    return (
        <div className="container">
            <h1>Congratulations!</h1><br/>
            <p>You have successfully signed up for.</p>
            <img src={myImage} alt="" />
            <button className="login-button"><Link className="signin-link" to="/">Log in</Link></button>
        </div>
        );
        };
export default Congratulations;