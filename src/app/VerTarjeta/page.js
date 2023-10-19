'use client'



import React, { useEffect } from 'react';
import ButtonAgregarTarjeta from '@/Components/ButtonAgregarTarjeta';
import ButtonEliminarTarjeta from '@/Components/ButtonEliminarTarjeta';
import MenuNuevo from '@/Components/MenuNuevo';
import { useState } from 'react';

function VerTarjeta() {
  const [userCards, setUserCards] = useState([]);
  const maxCardLimit = 5;

  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem("userLoggedIn") === "true";

    if (userIsLoggedIn) {
      const authenticatedUser = JSON.parse(localStorage.getItem("currentUser"));

      if (authenticatedUser && authenticatedUser.cards) {
        setUserCards(authenticatedUser.cards);
      }
    }
  }, []);

  const handleCardDeletion = (cardType) => {
    const updatedUserCards = userCards.filter((card) => card.type !== cardType);
    const authenticatedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (authenticatedUser) {
      authenticatedUser.cards = updatedUserCards;
      localStorage.setItem("currentUser", JSON.stringify(authenticatedUser));
      setUserCards(updatedUserCards);
    }
  };

  const handleCardDetails = (cardType) => {
    window.location.href = `/Edit-card?cardType=${cardType}`;
  };

  const handleCardAddition = (cardType) => {
    if (userCards.length >= maxCardLimit) {
      alert('No puedes agregar más de 5 tarjetas.');
      return;
    }


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

              {userCards.length < maxCardLimit && (
                <ButtonAgregarTarjeta handleCardAddition={handleCardAddition} />
              )}

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
