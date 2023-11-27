'use client'

import React, { useState, useEffect } from "react";
import './signup.css';
import Link from "next/link";
import UsuariosApi from "../api_fronted/usuarios.js"
import { useRouter } from 'next/navigation';

//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { listItemTextClasses } from "@mui/material";

const SignUp = () => {

  const [usuarios, setUsuarios] = useState([]);
  const router = useRouter();

  const [nombres, setFirstName] = useState("");
  const [apellidos, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [contrasenia, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [listUsuarios, setListUsuarios] = useState([]);

  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
const LoadData = async() =>{
  const result3 = await UsuariosApi.findAll();

  setListUsuarios(result3.data)

 
}

useEffect(() => {
    

  LoadData();
  
      
}, []);

  const notifyError = (mensaje) => {
    toast.error(mensaje , {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  const notifySuccess = (mensaje) => {
    toast.success(mensaje , {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Recupera la lista de usuarios del Local Storage y asegúrate de que sea un arreglo
    //const storedUsers = JSON.parse(localStorage.getItem("users"));
    //const usersList = Array.isArray(storedUsers) ? storedUsers : [];
  
    if (nombres === "" || apellidos === "" || username === "" || contrasenia === "" || confirmPassword === "" || email === "") {
      const mensaje = "Por favor llene todos los campos"
      notifyError(mensaje)
      return;
      
    //} else if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    //  alert("El nombre y apellido deben contener solo letras y espacios.");
    //} else if (!passwordRegex.test(password) || !passwordRegex.test(confirmPassword)) {
     // alert("La contraseña debe tener al menos 5 caracteres, incluyendo una letra, un dígito y un carácter especial.");
    }  if (contrasenia !== confirmPassword) {
      const mensaje = "Las contraseñas no coinciden"
      notifyError(mensaje)
      return;
    }  if(usuarios.find((e) => e.email === email)) {
      const mensaje = "Este correo ya está registrado"
      notifyError(mensaje)
      return;
    }

          const ultimoID = listUsuarios[listUsuarios.length - 1];
          console.log("ultimo reporte",listUsuarios)
          console.log("ultimo reporte",ultimoID)
      // Genera el nuevo ID sumándole 1 al ID del último reporte
      const nuevoId = ultimoID ? ultimoID.id + 1 : 1;

      // Utiliza el nuevo ID en tu lógica
      const userId = nuevoId
      const user = {
        id: userId,
        nombres,
        apellidos,
        username,
        contrasenia,
        email,
        
      };

      console.log(user);

      try {
        // Realiza la solicitud POST al backend para registrar el nuevo usuario utilizando la función personasApi
        const response = await UsuariosApi.create(user);
    
        // Comprueba el resultado de la solicitud
          if (response && response.status === 200) {
              // Registro exitoso, redirige a la página de inicio de sesión
              const mensaje = "Registro exitoso"
              notifySuccess(mensaje)
              router.push('/Congrats');
          } else {
              // Manejo de errores en caso de que algo salga mal en el backend
              const mensaje = "Error al registrar"
              notifyError(mensaje)
          }
      } catch (error) {
        console.error("Error en la solicitud: ", error);
      }
        

      //usersList.push(user); // Agrega el nuevo usuario a la lista existente
  
      // Vuelve a almacenar la lista de usuarios en el Local Storage
      //localStorage.setItem("users", JSON.stringify(usersList));
      //console.log("Lista de usuarios actualizada:", usersList);
      // Aquí puedes llamar a tu función registrarUsuario si es necesario
      // registrarUsuario(email, password, firstName, lastName, username);
      //window.location.href = `/Congrats?userId=${userId}`;
    
  };
  
  useEffect(() => {
    // Aquí puedes realizar una solicitud GET al backend para obtener la lista de usuarios registrados
    const handleOnLoad = async () => {
      try{
          const result = await UsuariosApi.findAll();
          setUsuarios(result.data);
          console.log(usuarios)
      } catch (error) {
          console.error('Error al obtener usuarios:', error);
      }
    
    } 
    handleOnLoad();
    console.log(usuarios[usuarios.length-1]) 
    }, []);
  

  
  return (
    <div>
    <ToastContainer></ToastContainer>
    <div className="register-container">
      
      <h1>Sign Up for</h1>
      <img src="https://cdn.discordapp.com/attachments/1025977476096204862/1162442035278659604/logo-name.jpeg?ex=653bf382&is=65297e82&hm=530a33fa80ce87770b863c679e0da9e2cfa806c99cfea4f8bf423de6a7ee639f&" alt="" />

      <input
        className="register-input"
        type="text"
        name="firstName"
        placeholder="First Name"
        value={nombres}
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
        value={apellidos}
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
        value={contrasenia}
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
      <span onClick={() => router.push('/Login')} className="already-button">Tienes una cuenta?, Ingresa aquí</span>
           

      <hr></hr>
      <a className="terms">By selecting Create your new Account, you agree to our <a> </a>
        
        <Link href="./Terms">
          Terms and Conditions
        </Link>
      </a>
    </div>
    </div>
  );
};

export default SignUp;
