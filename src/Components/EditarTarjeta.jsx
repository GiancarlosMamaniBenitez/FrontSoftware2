import React from 'react';

function EditarTarjeta({ cardId, onEditCard }) { // Cambia cardType a cardId
  const handleEditClick = () => {
    onEditCard(cardId); // Cambia cardType a cardId
  }

  return (
    <div>
      <button onClick={handleEditClick} className="card-button">
        Editar
      </button>
    </div>
  );
}

export default EditarTarjeta;
