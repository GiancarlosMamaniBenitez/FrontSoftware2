'use client'
import React, { useEffect } from 'react';
import ButtonAgregarTarjeta from '@/Components/ButtonAgregarTarjeta';
import ButtonEliminarTarjeta from '@/Components/ButtonEliminarTarjeta';
import MenuNuevo from '@/Components/MenuNuevo';
import { useState } from 'react';

function VerTarjeta() {
  const [userCards, setUserCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState('');

  useEffect(() => {
    // Verificar si el usuario tiene tarjetas asociadas en el Local Storage
    const storedUsersData = localStorage.getItem('usersData');

    if (storedUsersData) {
      const usersData = JSON.parse(storedUsersData);
      const authenticatedUser = {
        id: id,
      };

      if (usersData[authenticatedUser.username] && usersData[authenticatedUser.username].cards) {
        setUserCards(usersData[authenticatedUser.username].cards);
      }
    }
  }, []);

  const handleCardDeletion = (cardType) => {
    // Eliminar una tarjeta por su tipo
    const updatedUserCards = userCards.filter((card) => card !== cardType);
    const storedUsersData = localStorage.getItem('usersData');
    
    if (storedUsersData) {
      const usersData = JSON.parse(storedUsersData);
      const authenticatedUser = {
        id: id,
      };
      
      if (usersData[authenticatedUser.username]) {
        usersData[authenticatedUser.username].cards = updatedUserCards;
        localStorage.setItem('usersData', JSON.stringify(usersData));
        setUserCards(updatedUserCards);
      }
    }
  };

  const handleCardAddition = (cardType) => {
    if (userCards.length >= 5) {
      alert('No puedes agregar más de 5 tarjetas.');
      return;
    }

    // Agregar una tarjeta al usuario
    const storedUsersData = localStorage.getItem('usersData');
    
    if (storedUsersData) {
      const usersData = JSON.parse(storedUsersData);
      const authenticatedUser = {
        id: id,
      };
      
      if (usersData[authenticatedUser.username]) {
        usersData[authenticatedUser.username].cards.push(cardType);
        localStorage.setItem('usersData', JSON.stringify(usersData));
        setUserCards([...userCards, cardType]);
      }
    }
  };

  return (
    <div>
      <div>
        <MenuNuevo />
      </div>
      <div className="Agregar">
        <h1>TARJETAS REGISTRADAS</h1>
        <div>
          {userCards && userCards.length > 0 ? (
            <>
              <h2>¿Desea eliminar alguna tarjeta?</h2>
              <ButtonEliminarTarjeta
                userCards={userCards}
                handleCardDeletion={handleCardDeletion}
              />
            </>
          ) : (
            <>
              <h2>¿Qué tipo de tarjeta desea registrar?</h2>
              <ButtonAgregarTarjeta
                handleCardAddition={handleCardAddition}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerTarjeta;
