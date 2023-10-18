'use client'
import React, { useEffect } from 'react';
import Link from 'next/link'; // Importa el componente Link
import ButtonAgregarTarjeta from '@/Components/ButtonAgregarTarjeta';
import ButtonEliminarTarjeta from '@/Components/ButtonEliminarTarjeta';
import MenuNuevo from '@/Components/MenuNuevo';
import { useState } from 'react';

function VerTarjeta() {
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    // Verificar si el usuario ha iniciado sesión
    const userIsLoggedIn = localStorage.getItem("userLoggedIn") === "true";

    if (userIsLoggedIn) {
      // Obtener los datos del usuario autenticado desde el Local Storage
      const authenticatedUser = JSON.parse(localStorage.getItem("currentUser"));

      if (authenticatedUser && authenticatedUser.cards) {
        setUserCards(authenticatedUser.cards);
      }
    }
  }, []);

  const handleCardDeletion = (cardType) => {
    // Eliminar una tarjeta por su tipo
    const updatedUserCards = userCards.filter((card) => card.type !== cardType);
    const authenticatedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (authenticatedUser) {
      authenticatedUser.cards = updatedUserCards;
      localStorage.setItem("currentUser", JSON.stringify(authenticatedUser));
      setUserCards(updatedUserCards);
    }
  };

  const handleCardDetails = (cardType) => {
    // Redirige a la página de edición de la tarjeta
    // La URL incluirá el tipo de tarjeta como un parámetro
    window.location.href = `/Edit-card?cardType=${cardType}`;
  };

  const handleCardAddition = (cardType) => {
    if (userCards.length >= 5) {
      alert('No puedes agregar más de 5 tarjetas.');
      return;
    }

    // Agregar una tarjeta al usuario autenticado
    const authenticatedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (authenticatedUser) {
      if (Array.isArray(authenticatedUser.cards)) {
        authenticatedUser.cards.push({ type: cardType, data: {} });
      } else {
        authenticatedUser.cards = [{ type: cardType, data: {} }];
      }

      localStorage.setItem("currentUser", JSON.stringify(authenticatedUser));
      setUserCards([...userCards, { type: cardType, data: {} }]);
    }
  };

  return (
    <div>
      <MenuNuevo />
      <div className="Agregar">
        <h1>TARJETAS REGISTRADAS</h1>
        <div>
          {userCards && userCards.length > 0 ? (
            <div>
              <h2>¿Desea eliminar alguna tarjeta o ver más detalles?</h2>
              {userCards.map((card, index) => (
                <div key={index} className="card-option">
                  <div className="card-image-container">
                    <img src={`/${card.type}.png`} alt={card.type} className="card-image" />
                    <button
                      onClick={() => handleCardDeletion(card.type)}
                      className="card-button"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => handleCardDetails(card.type)}
                      className="card-button"
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h2>¿Qué tipo de tarjeta desea registrar?</h2>
              <ButtonAgregarTarjeta handleCardAddition={handleCardAddition} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerTarjeta;
