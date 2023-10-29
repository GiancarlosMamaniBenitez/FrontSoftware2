import React, { useState } from 'react';
import './AgregarTarjeta.css';
import Link from 'next/link';

function ButtonAgregarTarjeta() {
  const [selectedCard, setSelectedCard] = useState(""); // Estado para almacenar el tipo de tarjeta seleccionado

  const handleCardSelection = (cardType) => {
    setSelectedCard(cardType); // Almacena el tipo de tarjeta seleccionado en el estado
  };

  const cardTypes = ['TarjetaVisa', 'Mastercard', 'AmericanExpress', 'DinersClub'];

  return (
    <div>
      <div className="card-container">
        {cardTypes.map((cardType) => (
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
      <div className='button-addcard'>
        <Link href={`/Add-card?cardType=${selectedCard}`}>
          ASOCIAR TARJETA
        </Link>
      </div>
    </div>
  );
}

export default ButtonAgregarTarjeta;
