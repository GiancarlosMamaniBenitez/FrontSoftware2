'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from 'react-bootstrap/Button';

function EliminarTarjeta() {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState(""); // Almacena el tipo de tarjeta seleccionado
  const [userCards, setUserCards] = useState([]); // Almacena las tarjetas del usuario
  const [message, setMessage] = useState(""); // Mensaje para mostrar si no hay tarjetas para eliminar

  // Verificar si el usuario tiene tarjetas asociadas en el Local Storage
  useEffect(() => {
    const storedUserCards = localStorage.getItem("userCards");
    if (storedUserCards) {
      setUserCards(JSON.parse(storedUserCards));
    }
  }, []);

  const handleCardSelection = (cardType) => {
    setSelectedCard(cardType);
  };

  const handleDeleteCard = () => {
    if (!selectedCard) {
      alert("Por favor, selecciona un tipo de tarjeta a eliminar.");
      return;
    }

    // Eliminar la tarjeta del tipo seleccionado
    const updatedUserCards = userCards.filter((card) => card.selectedCard !== selectedCard);
    setUserCards(updatedUserCards);

    // Actualizar el Local Storage con las tarjetas actualizadas
    localStorage.setItem("userCards", JSON.stringify(updatedUserCards));

    // Redirigir al usuario de regreso a la página principal después de eliminar la tarjeta
    router.push("/VerTarjeta");
  };

  useEffect(() => {
    // Comprueba si el usuario tiene tarjetas del tipo seleccionado
    const hasCardsToDelete = userCards.some((card) => card.selectedCard === selectedCard);

    if (!hasCardsToDelete) {
      setMessage("No hay tarjetas de este tipo registradas.");

      // Redirigir al usuario de regreso a la página principal después de 10 segundos
      const timer = setTimeout(() => {
        router.push("/VerTarjeta");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [selectedCard, userCards, router]);

  return (
    <div>
      <h1>Eliminar Tarjeta</h1>
      {message && <p>{message}</p>}
      {userCards.length > 0 && (
        <div>
          <p>Selecciona el tipo de tarjeta que deseas eliminar:</p>
          <form>
            {userCards.map((card, index) => (
              <div key={index}>
                {card.selectedCard === selectedCard ? (
                  <label>
                    <input
                      type="radio"
                      name="selectedCard"
                      value={card.selectedCard}
                      checked={selectedCard === card.selectedCard}
                      onChange={() => handleCardSelection(card.selectedCard)}
                    />
                    {card.selectedCard}
                  </label>
                ) : null}
              </div>
            ))}
          </form>
          <div>
            <Button variant="primary" onClick={handleDeleteCard}>
              Eliminar Tarjeta
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EliminarTarjeta;
