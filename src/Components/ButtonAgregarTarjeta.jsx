import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import './AgregarTarjeta.css';


function ButtonAgregarTarjeta({ userCards, setUserCards }) {
  const [selectedCard, setSelectedCard] = useState('');

  const handleCardSelection = (cardType) => {
    setSelectedCard(cardType);
  };

  const handleCardAddition = () => {
    // Agrega lógica para agregar la tarjeta al usuario y actualizar el estado
    // Asegúrate de manejar adecuadamente la adición de tarjetas.
  };

  return (
    <div>
      <div className="card-container">
        {['TarjetaVisa', 'Mastercard', 'AmericanExpress', 'DinersClub'].map((cardType) => (
          <div key={cardType} className="card-option">
            <div className="card-image-container">
              <img src={`/${cardType}.png`} alt={cardType} className="card-image" />
              <button
                onClick={() => handleCardSelection(cardType)}
                className={`card-button ${selectedCard === cardType ? 'selected' : ''}`}
              >
                {selectedCard === cardType ? 'Seleccionada' : 'Seleccionar'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          className="mb-2"
          variant="primary"
          size="lg"
          onClick={handleCardAddition}
        >
          ASOCIAR TARJETA
        </button>
      </div>
    </div>
  );
}

export default ButtonAgregarTarjeta;
