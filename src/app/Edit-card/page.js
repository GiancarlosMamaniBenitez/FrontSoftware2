// Página para editar los detalles de la tarjeta
'use client'



import React, { useState, useEffect } from "react";
import NavBar from "@/Components/NavBar";
import './addCard.css';

const EditCard = () => {
  const [number, setNumber] = useState("");
  const [mm, setMm] = useState("");
  const [yyyy, setYyyy] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState(null);

  const [selectedCardId, setSelectedCardId] = useState(null); // Inicializa selectedCardId como null.

  useEffect(() => {
    // Obtener el usuario autenticado desde el Local Storage
    const authenticatedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (authenticatedUser && authenticatedUser.cards) {
      // Recuperar el ID de la tarjeta seleccionada (puedes implementar una lógica para seleccionar una específica)
      // Aquí estamos seleccionando la primera tarjeta como ejemplo
      const firstCard = authenticatedUser.cards[0];

      if (firstCard) {
        setNumber(firstCard.number);
        setMm(firstCard.mm);
        setYyyy(firstCard.yyyy);
        setCvv(firstCard.cvv);
        setSelectedCardId(firstCard.id); // Actualiza selectedCardId con el ID de la tarjeta seleccionada
      }
    }
  }, []);

  const handleNumberChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "").slice(0, 16);
    const formattedValue = numericValue.replace(/(\d{4})/g, "$1 ");
    setNumber(formattedValue);
  };

  const handleMmChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "").slice(0, 2);
    setMm(numericValue);
  };

  const handleYyyyChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "").slice(0, 4);
    setYyyy(numericValue);
  };

  const handleCvvChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "").slice(0, 3);
    setCvv(numericValue);
  };

  const validateFields = () => {
    if (!number || !mm || !yyyy || !cvv) {
      setError("Por favor, complete todos los campos.");
      return false;
    }
    return true;
  };

  const redirectToHome = () => {
    window.location.href = "/VerTarjeta";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateFields()) {
      // Obtener el usuario autenticado desde el Local Storage
      const authenticatedUser = JSON.parse(localStorage.getItem("currentUser"));

      const cardData = {
        id: selectedCardId, // Utiliza el ID de la tarjeta seleccionada
        number,
        mm,
        yyyy,
        cvv,
      };

      if (authenticatedUser && authenticatedUser.cards) {
        // Actualizar los datos de la tarjeta en el Local Storage
        authenticatedUser.cards = authenticatedUser.cards.map((card) =>
          card.id === selectedCardId ? cardData : card
        );

        // Actualizar el usuario en el Local Storage
        localStorage.setItem("currentUser", JSON.stringify(authenticatedUser));

        redirectToHome();
        console.log("Updating card:", cardData);
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className="addCard-container">
        <h1>Edit your card.</h1>
        {error && <p className="error-message">{error}</p>}
        <hr />
        <input
          className="number-input"
          type="text"
          name="number"
          placeholder="1111 2222 3333 4444"
          value={number}
          onChange={handleNumberChange}
        />
        <hr />
        <table>
          <tr>
            <td>
              <input
                className="MM-input"
                type="text"
                name="mm"
                placeholder="MM"
                value={mm}
                onChange={handleMmChange}
              />
            </td>
            <td>
              <input
                className="YYYY-input"
                type="text"
                name="yyyy"
                placeholder="YYYY"
                value={yyyy}
                onChange={handleYyyyChange}
              />
            </td>
          </tr>
        </table>
        <hr />
        <input
          className="cvv-input"
          type="text"
          name="cvv"
          placeholder="CVV"
          value={cvv}
          onChange={handleCvvChange}
        />
        <hr />
        <button className="add-button" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditCard;
