'use client'





import React, { useState, useEffect } from "react";
import NavBar from "@/Components/NavBar";
import './addCard.css';

const AddCard = ({ selectedCard }) => {
  const [number, setNumber] = useState("");
  const [mm, setMm] = useState("");
  const [yyyy, setYyyy] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState(null);
  const [cardCounter, setCardCounter] = useState(1); 

  
  // Obtén la URL actual
const currentURL = window.location.href;

// Analiza la URL para obtener sus componentes
const url = new URL(currentURL);

// Obtiene el valor del parámetro "cardType"
const cardType = url.searchParams.get("cardType");

console.log(cardType); // Esto mostrará "Mastercard" si la URL es "http://localhost:3000/Add-card?cardType=Mastercard"


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

  const redirectToHome = () => {
    window.location.href = "/VerTarjeta";
  };

  const findUserById = (userId) => {
    const userList = JSON.parse(localStorage.getItem("users")) || [];
    return userList.find(user => user.id === userId);
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

  const handleSubmit = () => {
    if (validateFields()) {
      const storedUsers = JSON.parse(localStorage.getItem("users"));
      const usersList = Array.isArray(storedUsers) ? storedUsers : [];
  
      const authenticatedUser = JSON.parse(localStorage.getItem("currentUser")) || {};
      const userId = authenticatedUser.id;
  
      // Buscamos al usuario actual en el arreglo de usuarios
      const user = usersList.find((user) => user.id === userId);
  
      if (!user) {
        setError("Usuario no encontrado.");
        return;
      }
  
      // Encontramos el ID más alto entre las tarjetas del usuario actual
      const highestCardId = (user.cards || []).reduce((maxId, card) => {
        return card.id > maxId ? card.id : maxId;
      }, 0);
  
      const cardData = {
        id: highestCardId + 1, // Aumentamos el ID en 1
        cardType: cardType,
        number,
        mm,
        yyyy,
        cvv,
        incomes: [],
        expenses: [],
        spendingLimit: 0,
        savingsGoal: 0,
        reporte: [],
      };
  
      if (checkIfCardExists(cardData, user)) {
        return;
      }
  
      user.cards = [...(user.cards || []), cardData];
  
      // Actualizamos el usuario en la lista de usuarios
      const updatedUserList = usersList.map((u) => (u.id === userId ? user : u));
      localStorage.setItem("users", JSON.stringify(updatedUserList));
      setCardCounter(highestCardId + 2); // Aumentamos el contador
      redirectToHome();
      console.log("Nueva tarjeta registrada:", cardData);
    }
  };
  

  return (
    <div>
      <NavBar />
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
