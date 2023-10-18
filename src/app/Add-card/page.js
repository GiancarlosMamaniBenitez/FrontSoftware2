'use client'
import React, { useState } from "react";
import NavBar from "@/Components/NavBar";

const AddCard = () => {
  const [number, setNumber] = useState("");
  const [mm, setMm] = useState("");
  const [yyyy, setYyyy] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardsname, setCardsname] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [error, setError] = useState(null);

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
    if (!cardsname || !number || !mm || !yyyy || !cvv) {
      setError("Por favor, complete todos los campos.");
      return false;
    }
    return true;
  };

  const redirectToHome = () => {
    window.location.href = "/Home";
  };

  const checkIfCardExists = (cardData, authenticatedUser) => {
    const usersData = JSON.parse(localStorage.getItem("usersData")) || {};

    if (usersData[authenticatedUser.username]) {
      const cards = usersData[authenticatedUser.username].cards;
      if (cards.some((card) => card.number === cardData.number)) {
        setError("La tarjeta ya está asociada a tu cuenta.");
        return true;
      }
    }

    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateFields()) {
      const authenticatedUser = {
        username: "usuario_ejemplo",
      };

      const cardData = {
        number,
        mm,
        yyyy,
        cvv,
        cardsname,
        selectedCard,
      };

      if (checkIfCardExists(cardData, authenticatedUser)) {
        return;
      }

      const usersData = JSON.parse(localStorage.getItem("usersData")) || {};

      if (!usersData[authenticatedUser.username]) {
        usersData[authenticatedUser.username] = {
          cards: [],
        };
      }

      usersData[authenticatedUser.username].cards.push(cardData);

      localStorage.setItem("usersData", JSON.stringify(usersData));

      redirectToHome();
      console.log("Registering new card:", cardData);
      console.log("User data:", usersData);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="addCard-container">
        <h1>Add your card.</h1>
        {error && <p className="error-message">{error}</p>}
        <hr />
        <input
          className="name-input"
          type="text"
          name="name-card"
          placeholder="Card's name"
          value={cardsname}
          onChange={(event) => setCardsname(event.target.value)}
        />
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
          Confirm
        </button>
      </div>
    </div>
  );
};

export default AddCard;
