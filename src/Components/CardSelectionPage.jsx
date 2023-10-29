import React, { useState } from 'react';
import ButtonAgregarTarjeta from './ButtonAgregarTarjeta';

function CardSelectionPage() {
  const [selectedCard, setSelectedCard] = useState('');

  const handleCardSelection = (cardType) => {
    setSelectedCard(cardType);
  };

  return (
    <div>
      <h1>Seleccione el tipo de tarjeta:</h1>
      <ButtonAgregarTarjeta
        selectedCard={selectedCard}
        handleCardSelection={handleCardSelection} // Asegúrate de pasar la función correctamente
      />
    </div>
  );
}

export default CardSelectionPage;
