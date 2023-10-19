'use client'




import React, { useState, useEffect } from "react";
import NavBar from "@/Components/NavBar";



import './addCard.css';

const AddCard = () => {
  const [number, setNumber] = useState("");
  const [mm, setMm] = useState("");
  const [yyyy, setYyyy] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardsname, setCardsname] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [error, setError] = useState(null);

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [spendingLimit, setSpendingLimit] = useState(0); // Nuevo estado para el límite de gasto
  const [savingsGoal, setSavingsGoal] = useState(0); // Nuevo estado para la meta de ahorro

  useEffect(() => {
    const authenticatedUser = JSON.parse(localStorage.getItem("currentUser")) || { cards: [] };
    const userCards = authenticatedUser.cards || [];

    if (userCards.length > 0) {

      const firstCard = userCards[0];
      setCardsname(firstCard.cardsname);
      setNumber(firstCard.number);
      setMm(firstCard.mm);
      setYyyy(firstCard.yyyy);
      setCvv(firstCard.cvv);
      setSelectedCard(firstCard.selectedCard);

      setIncomes(firstCard.incomes || []);
      setExpenses(firstCard.expenses || []);
      setCategories(firstCard.categories || []);
      setSpendingLimit(firstCard.spendingLimit || 0); // Cargar el límite de gasto
      setSavingsGoal(firstCard.savingsGoal || 0); // Cargar la meta de ahorro

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


  const addCategory = (categoryName) => {
    if (categoryName) {
      setCategories([...categories, categoryName]);
    }
  };


  const validateFields = () => {
    if (!cardsname || !number || !mm || !yyyy || !cvv) {
      setError("Por favor, complete todos los campos.");
      return false;
    }
    return true;
  };

  const redirectToHome = () => {
    window.location.href = "/VerTarjeta";
  };

  const checkIfCardExists = (cardData, authenticatedUser) => {

    if (authenticatedUser.cards) {

      if (authenticatedUser.cards.some((card) => card.number === cardData.number)) {
        setError("La tarjeta ya está asociada a tu cuenta.");
        return true;
      }
    }

    return false;
  };


  const handleSubmit = () => {
    if (validateFields()) {
      const authenticatedUser = JSON.parse(localStorage.getItem("currentUser")) || { cards: [] };


      const cardData = {
        number,
        mm,
        yyyy,
        cvv,
        cardsname,
        selectedCard,

        incomes,
        expenses,
        categories,
        spendingLimit, // Nuevo atributo
        savingsGoal, // Nuevo atributo

      };

      if (checkIfCardExists(cardData, authenticatedUser)) {
        return;
      }


      const existingCard = authenticatedUser.cards.find((card) => card.number === cardData.number);
      if (existingCard) {
        existingCard.incomes = cardData.incomes;
        existingCard.expenses = cardData.expenses;
        existingCard.categories = cardData.categories;
        existingCard.spendingLimit = cardData.spendingLimit; // Actualizar el límite de gasto
        existingCard.savingsGoal = cardData.savingsGoal; // Actualizar la meta de ahorro
      } else {
        authenticatedUser.cards.push(cardData);
      }

      localStorage.setItem("currentUser", JSON.stringify(authenticatedUser));

      redirectToHome();
      console.log("Registering new card:", cardData);

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

        
        
        <hr />

        <button className="add-button" onClick={handleSubmit}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default AddCard;
