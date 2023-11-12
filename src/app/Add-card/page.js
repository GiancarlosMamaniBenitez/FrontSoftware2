'use client'





import React, { useState, useEffect } from "react";
import NavBar from "@/Components/NavBar";
import './addCard.css';
import "./lala.css";
import { useRouter } from "next/navigation";
import TarjetasApi from "../api_fronted/tarjetas";
import $ from 'jquery';

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
  const [Cards , setCards] = useState({});
  const [name, setName] = useState("");

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
          setCards(result.data);
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


  const combinedDate = `${mm}/${yyyy}`;


  const checkIfCardExists = (card, usuario) => {
    if (Cards) {
    
     let Tarjetas = Cards.filter((e) => e.id_usuario == usuario.id)

      if (Tarjetas.some((e) => e.number == card.number)) {
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
         // Aumentamos el ID en 1
        cardType: cardType,
        cvv: cvv,  
        number: number,
        mm: mm,
        yyyy: yyyy,
        spendingLimit: 0,
        savingsGoal: 0,
        id_usuario:sesion.id
        
        
      };
      console.log(card)
  
      if (checkIfCardExists(card, usuario)) {
        setError("La tarjeta ya está asociada a tu cuenta.");
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
      
      //localStorage.setItem("sesion", JSON.stringify(card));
      console.log(sesion)
      setCardCounter(highestCardId + 2); // Aumentamos el contador
      
     
    }
  };
  const handleExpiryDateChange = (event) => {
    handleMmChange(event);
    handleYyyyChange(event);
  };
  const cardTypes = ['Visa', 'Mastercard', 'AmericanExpress', 'DinersClub'];


  
var cardFlipped;

$(document).ready(function() {
  cardFlipped = false;
  $("input").keyup(function() {
    var value = $(this).val();
    var name = "#" + $(this).attr("name");
    $(name).text(value);
  }).keyup();

  $("#flip").focus(function() {
    flipCard();
  });
  $("#flip").focusout(function() {
    flipCard();
  });
});

function flipCard() {
  if (cardFlipped == false) {
    // Flip the card to back
    $("#card-front").fadeOut(300);
    $("#card-back").fadeIn(300);

    cardFlipped = true;
  } else {
    // Flip the card to front
    $("#card-back").fadeOut(300);
    $("#card-front").fadeIn(300);

    cardFlipped = false;
  }
};
  
  return (
    <div>
      <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion} />
      <div className="addCard-container">
        <h1>Añade tu tarjeta {cardType} </h1>
        {error && <p className="error-message">{error}</p>}
        <hr />
        <div className="card-wrapper">
          <div id="card-front" className="card">
            <div className="chip-top"></div>
            <div className="chip"></div>
            <div id="card-number">{number}</div>
            <div id="card-name">{sesion.nombre}</div>
            <div id="valid-until">Valid Until</div>
            <div id="expiry-date"></div>
            <div id="expiry-date2"></div>
            <div id="nombre-tarjeta"><img src={`/${cardType}.png`} alt={cardType} className="card-image" /></div>
          </div>
          <div id="card-back" className="card">
            <div id="card-back-strip"></div>
            <div id="card-back-box"></div>
            <div id="card-back-cvv">{cvv}</div>
            <div id="card-back-label">CVV Numero</div>
          </div>
        </div>
        <form id="card-form">
        <input
            type="text"
            className="cardname"
            name="card-name"
            placeholder="Nombre"
            maxLength="20"
            value={sesion.nombre}
            autoFocus
            onChange={setName}
          />

          <input
            type="text"
            className="card-number"
            name="card-number"
            placeholder="Numero de tarjeta"
            maxLength="19"
            autoComplete="off"
            value={number}
            onChange={handleNumberChange}
          />
          <input
            type="text"
            className="expirydate"
            name="expiry-date2"
            placeholder="Mes"
            maxLength="5"
            value={mm}
            onChange={handleMmChange} 
          />
          <input
            type="text"
            className="expirydate"
            name="expiry-date"
            placeholder="Año"
            maxLength="5"
            value={yyyy}
            onChange={handleYyyyChange} 
          />
          <input
            id="flip"
            type="text"
            className="cvvnumber"
            name="card-back-cvv"
            placeholder="CVV"
            autoComplete="off"
            maxLength="3"
            value={cvv}
            onChange={handleCvvChange}
          />
        </form>
        <hr />
        <button className="add-button" onClick={handleSubmit}>
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default AddCard;
