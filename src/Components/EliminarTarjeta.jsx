// EliminarTarjeta.js
import React from 'react';

function EliminarTarjeta({ cardType, onDeleteCard }) {
  const handleDeleteClick = () => {
    onDeleteCard(cardType);
  }

  return (
    <div>
      <button onClick={handleDeleteClick} className="card-button">
        Eliminar
      </button>
    </div>
  );
}

export default EliminarTarjeta;
