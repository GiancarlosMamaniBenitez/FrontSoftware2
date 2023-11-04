'use client'





import React, { useState, useEffect } from "react";
import NavBar from "@/Components/NavBar";
import './addCard.css';
import { useRouter } from "next/navigation";
import TarjetasApi from "../api_fronted/tarjetas";
const AddCard = ({ selectedCard }) => {
  const [number, setNumber] = useState("");
  const [mm, setMm] = useState("");
  const [yyyy, setYyyy] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState(null);
  const [cardCounter, setCardCounter] = useState(1); 
  const{card, setCard} = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sesion , setSesion] = useState({});
  useEffect(() => {
    // Verifica si el usuario ha iniciado sesión
    let sesionGuardada = localStorage.getItem("sesion");
        if(sesionGuardada == undefined){
          
            router.push('/')
        }
        setSesion(JSON.parse(sesionGuardada))
        console.log(sesion)
  }, []);

  useEffect(() => {
    // Aquí puedes realizar una solicitud GET al backend para obtener la lista de usuarios registrados
    const handleOnLoad = async () => {
      try{
          const result = await TarjetasApi.findAll();
          setUsuarios(result.data);
          console.log(usuarios)
      } catch (error) {
          console.error('Error al obtener usuarios:', error);
      }
    
    } 
    
    handleOnLoad();
     
    }, []);
  
  // Obtén la URL actual
const currentURL = window.location.href;

// Analiza la URL para obtener sus componentes
const url = new URL(currentURL);

// Obtiene el valor del parámetro "cardType"
const cardType = url.searchParams.get("cardType");
const router = useRouter();
console.log(cardType); // Esto mostrará "Mastercard" si la URL es "http://localhost:3000/Add-card?cardType=Mastercard"
const redirectToHome = () => {
 
  router.push('/');
}

  const handleNumberChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "");
    
    // Limita la longitud a 16 dígitos
    if (numericValue.length <= 16) {
      setNumber(numericValue);
    }
  };

  const handleMmChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "");

    // Limita la longitud a 2 dígitos
    if (numericValue.length <= 2) {
      setMm(numericValue);
    }
  };

  const handleYyyyChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "");

    // Limita la longitud a 4 dígitos
    if (numericValue.length <= 4) {
      setYyyy(numericValue);
    }
  };

  const handleCvvChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "");

    // Limita la longitud a 3 dígitos
    if (numericValue.length <= 3) {
      setCvv(numericValue);
    }
  };

  const validateFields = () => {
    if ( !number || !mm || !yyyy || !cvv) {
      setError("Por favor, complete todos los campos.");
      return false;
    }
    return true;
  };


  

  const checkIfCardExists = (cardData, user) => {
    if (user.cards) {
      if (user.cards.some((card) => card.number === cardData.number)) {
        setError("La tarjeta ya está asociada a tu cuenta.");
        setCardCounter(cardCounter + 1);
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      const usuario = JSON.parse(localStorage.getItem("sesion"));
      
      if (!usuario) {
        setError("Usuario no encontrado.");
        return;
      }
  
      // Encontramos el ID más alto entre las tarjetas del usuario actual
      const highestCardId = (usuario.cards || []).reduce((maxId, card) => {
        return card.id > maxId ? card.id : maxId;
      }, 0);
      const idUser = usuario.id;
      const card = {
        id: highestCardId + 1, // Aumentamos el ID en 1
        cardType: cardType,
        cvv,  
        number,
        mm,
        yyyy,
        spendingLimit: 0,
        savingsGoal: 0,
        id_usuario:idUser
        
        
      };
      console.log(card)
  
      if (checkIfCardExists(card, usuario)) {
        return;
      }
  
      usuario.cards = [...(usuario.cards || []), card];
  
      // Actualizamos el usuario en la lista de usuarios
      try {
        // Realiza la solicitud POST al backend para registrar el nuevo usuario utilizando la función personasApi
        const response = await TarjetasApi.create(card);
    
        // Comprueba el resultado de la solicitud
          if (response && response.status === 200) {
              // Registro exitoso, redirige a la página de inicio de sesión
              alert('Registro exitoso!');
              router.push('/VerTarjeta');
          } else {
              // Manejo de errores en caso de que algo salga mal en el backend
              alert('Error al registrar usuario( no manda la data)');
          }
      } catch (error) {
        console.error("Error en la solicitud: ", error);
    alert("Error al registrar usuario. Consulta la consola para más detalles.");
      }
      
      localStorage.setItem("sesion", JSON.stringify(card));
      console.log(sesion)
      setCardCounter(highestCardId + 2); // Aumentamos el contador
      redirectToHome();
     
    }
  };
  
  
  return (
    <div>
      <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion}/>
      <div className="addCard-container">
        <h1>Agregar tu tarjeta.</h1>
        {error && <p className="error-message">{error}</p>}
        <hr />
        <p>Tipo de Tarjeta: {cardType}</p> {/* Agrega esta línea para mostrar el tipo de tarjeta */}
        <input
          className="number-input"
          type="text"
          name="number"
          placeholder="1111 2222 3333 4444"
          value={number}
          onChange={handleNumberChange}
        />
        <hr />
        <table>
          <tr>
            <td>
              <input
                className="MM-input"
                type="text"
                name="mm"
                placeholder="MM"
                value={mm}
                onChange={handleMmChange}
              />
            </td>
            <td>
              <input
                className="YYYY-input"
                type="text"
                name="yyyy"
                placeholder="YYYY"
                value={yyyy}
                onChange={handleYyyyChange}
              />
            </td>
          </tr>
        </table>
        <hr />
        <input
          className="cvv-input"
          type="text"
          name="cvv"
          placeholder="CVV"
          value={cvv}
          onChange={handleCvvChange}
        />
        <hr />
        <hr />
        <button className="add-button" onClick={handleSubmit}>
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default AddCard;
