// EliminarTarjeta.js
import React from 'react';

function EliminarTarjeta({id, onDeleteCard }) {
  const handleDeleteClick = () => {
    onDeleteCard(id);
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
