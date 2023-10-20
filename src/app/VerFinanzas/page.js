'use client';

import React, { useState, useEffect } from "react";
import NavBar from "@/Components/NavBar";
import "./finances.css"; // Importar el archivo CSS
//import Chart from 'chart.js/auto'; // Importar Chart.js

const Finances = () => {
  const [selectedCard, setSelectedCard] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const [userCards, setUserCards] = useState(user?.cards || []);

  


  const [newExpense, setNewExpense] = useState(0);
  const [expenseCategory, setExpenseCategory] = useState("");
  const [newIncome, setNewIncome] = useState(0);
  const [newCategory, setNewCategory] = useState("");
  const [spendingLimit, setSpendingLimit] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [warning, setWarning] = useState("");

  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpensesByCategory, setTotalExpensesByCategory] = useState({});
  const [recentIncomes, setRecentIncomes] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);

  const getCurrentIncomesAndExpenses = () => {
    if (selectedCard) {
      const card = userCards.find((card) => card.number === selectedCard);
      if (card) {
        return {
          incomes: card.incomes || [],
          expenses: card.expenses || [],
        };
      }
      return { incomes: [], expenses: [] };
    }
    return { incomes: [], expenses: [] };
  };

  const [currentIncomesAndExpenses, setCurrentIncomesAndExpenses] = useState(getCurrentIncomesAndExpenses());

  useEffect(() => {
    setCurrentIncomesAndExpenses(getCurrentIncomesAndExpenses());
  }, [selectedCard, userCards]);

  useEffect(() => {
    calculateTotals();
  }, [currentIncomesAndExpenses]);

  const handleSelectedCardChange = (event) => {
    setSelectedCard(event.target.value);
    const selectedCardData = userCards.find((card) => card.number === event.target.value);
    if (selectedCardData) {
      setSpendingLimit(selectedCardData.spendingLimit || 0);
      setSavingsGoal(selectedCardData.savingsGoal || 0);
    }
  };

  const addNewExpense = () => {
    if (newExpense > 0 && selectedCard && expenseCategory) {
      const updatedUserCards = [...userCards];
      const cardIndex = updatedUserCards.findIndex((card) => card.number === selectedCard);
      if (cardIndex !== -1) {
        const card = updatedUserCards[cardIndex];
        const expenseId = card.expenses.length + 1;
        if (card.spendingLimit && totalExpensesByCategory[expenseCategory]) {
          const categoryExpenses = totalExpensesByCategory[expenseCategory] + newExpense;
          if (categoryExpenses > card.spendingLimit) {
            setWarning("Has superado tu límite de gasto.");
            return;
          } else if (categoryExpenses >= card.spendingLimit * 0.8) {
            setWarning("Ten cuidado, estás cerca de llegar a tu límite.");
          }
        }
        card.expenses = [
          ...card.expenses,
          { id: expenseId, amount: newExpense, category: expenseCategory },
        ];
        setUserCards(updatedUserCards);
        localStorage.setItem("currentUser", JSON.stringify({ ...user, cards: updatedUserCards }));
        setCurrentIncomesAndExpenses(getCurrentIncomesAndExpenses());
        setNewExpense(0);
        setExpenseCategory("");
        setWarning("");
      }
    }
  };

  const addNewIncome = () => {
    if (newIncome > 0 && selectedCard) {
      const updatedUserCards = [...userCards];
      const cardIndex = updatedUserCards.findIndex((card) => card.number === selectedCard);
      if (cardIndex !== -1) {
        const card = updatedUserCards[cardIndex];
        const incomeId = card.incomes.length + 1;
        card.incomes = [
          ...card.incomes,
          { id: incomeId, amount: newIncome },
        ];
        setUserCards(updatedUserCards);
        localStorage.setItem("currentUser", JSON.stringify({ ...user, cards: updatedUserCards }));
        setCurrentIncomesAndExpenses(getCurrentIncomesAndExpenses());
        setNewIncome(0);
      }
    }
  };

  const addNewCategory = () => {
    if (newCategory && selectedCard) {
      const updatedUserCards = [...userCards];
      const cardIndex = updatedUserCards.findIndex((card) => card.number === selectedCard);
      if (cardIndex !== -1) {
        const card = updatedUserCards[cardIndex];
        if (!card.categories) {
          card.categories = [newCategory];
        } else {
          card.categories = [...card.categories, newCategory];
        }
        setUserCards(updatedUserCards);
        localStorage.setItem("currentUser", JSON.stringify({ ...user, cards: updatedUserCards }));
        setCurrentIncomesAndExpenses(getCurrentIncomesAndExpenses());
        setNewCategory("");
      }
    }
  };

  const calculateTotals = () => {
    const incomes = currentIncomesAndExpenses.incomes;
    const expenses = currentIncomesAndExpenses.expenses;

    const totalIncomeAmount = incomes.reduce((total, income) => total + income.amount, 0);
    setTotalIncomes(totalIncomeAmount);

    const expensesByCategory = {};
    expenses.forEach((expense) => {
      const category = expense.category;
      if (category in expensesByCategory) {
        expensesByCategory[category] += expense.amount;
      } else {
        expensesByCategory[category] = expense.amount;
      }
    });

    setTotalExpensesByCategory(expensesByCategory);

    const sortedIncomes = incomes.slice().sort((a, b) => b.id - a.id);
    const sortedExpenses = expenses.slice().sort((a, b) => b.id - a.id);

    setRecentIncomes(sortedIncomes.slice(0, 3));
    setRecentExpenses(sortedExpenses.slice(0, 3));
  };

  const handleSpendingLimitChange = (event) => {
    const newLimit = parseFloat(event.target.value);
    setSpendingLimit(newLimit);
    updateCardData({ spendingLimit: newLimit });
  };

  const handleSavingsGoalChange = (event) => {
    const newGoal = parseFloat(event.target.value);
    setSavingsGoal(newGoal);
    updateCardData({ savingsGoal: newGoal });
  };

  const updateCardData = (updatedData) => {
    if (selectedCard) {
      const updatedUserCards = [...userCards];
      const cardIndex = updatedUserCards.findIndex((card) => card.number === selectedCard);
      if (cardIndex !== -1) {
        const card = updatedUserCards[cardIndex];
        updatedUserCards[cardIndex] = { ...card, ...updatedData };
        setUserCards(updatedUserCards);
        localStorage.setItem("currentUser", JSON.stringify({ ...user, cards: updatedUserCards }));
      }
    }
  };

 

  const calculateExpensesData = () => {
    const categories = Object.keys(totalExpensesByCategory);
    const amounts = Object.values(totalExpensesByCategory);
    return { categories, amounts };
  };

  

  return (
    <div>
      <NavBar />
      <div className="finances-container">
        <h1>View Finances</h1>

        <select value={selectedCard} onChange={handleSelectedCardChange}>
          <option value="">Select a Card</option>
          {userCards.map((card) => (
            <option key={card.number} value={card.number}>
              {card.cardsname} - {card.number}
            </option>
          ))}
        </select>

        {selectedCard && (
          <div>
            <h2>Card: {selectedCard}</h2>

            <div className="add-expense">
              <input
                type="number"
                value={newExpense}
                onChange={(e) => setNewExpense(parseFloat(e.target.value))}
                placeholder="Enter New Expense"
              />
              <select
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {userCards.find((card) => card.number === selectedCard)?.categories?.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {warning && <p className="warning">{warning}</p>}
              <button onClick={addNewExpense}>Add Expense</button>
            </div>

            <div className="add-income">
              <input
                type="number"
                value={newIncome}
                onChange={(e) => setNewIncome(parseFloat(e.target.value))}
                placeholder="Enter New Income"
              />
              <button onClick={addNewIncome}>Add Income</button>
            </div>

            <div className="add-category">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter New Category"
              />
              <button onClick={addNewCategory}>Add Category</button>
            </div>

            <div>
              <h3>Total Incomes:</h3>
              <p>Total Amount: ${totalIncomes}</p>
            </div>

            <div>
              <h3>Total Expenses by Category:</h3>
              <ul>
                {Object.entries(totalExpensesByCategory).map(([category, totalAmount]) => (
                  <li key={category}>
                    Category: {category}, Total Amount: ${totalAmount}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Recent Expenses:</h3>
              <ul>
                {recentExpenses.map((expense) => (
                  <li key={expense.id}>
                    Amount: ${expense.amount}, Category: {expense.category}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Recent Incomes:</h3>
              <ul>
                {recentIncomes.map((income) => (
                  <li key={income.id}>Amount: ${income.amount}</li>

                ))}
              </ul>
            </div>

            <div>
              <h3>Spending Limit:</h3>
              <input
                type="number"
                value={spendingLimit}
                onChange={handleSpendingLimitChange}
                placeholder="Enter Spending Limit"
              />

              <h3>Savings Goal:</h3>
              <input
                type="number"
                value={savingsGoal}
                onChange={handleSavingsGoalChange}
                placeholder="Enter Savings Goal"
              />
            </div>

            <div className="chart-container">
              <canvas id="expenses-chart" width={400} height={200}></canvas>
            </div>

            <div className="chart-container">
              <canvas id="incomes-chart" width={400} height={200}></canvas>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Finances;
