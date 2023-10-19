import React from 'react';
import './EliminarTarjeta.css';

function ButtonEliminarTarjeta({ userCards, handleCardDeletion }) {
  return (
    <div>
      <div className="card-container">
        {userCards.map((cardType, index) => (
          <div key={index} className="card-option">
            <div className="card-image-container">
              <img src={`/${cardType}.png`} alt={cardType} className="card-image" />
              <button
                onClick={() => handleCardDeletion(cardType)}
                className="card-button"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ButtonEliminarTarjeta;
