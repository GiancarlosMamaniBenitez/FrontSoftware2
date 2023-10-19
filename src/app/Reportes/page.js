'use client'

import React, { useEffect, useState } from 'react';

const Report = () => {
  const [totalExpensesByCategory, setTotalExpensesByCategory] = useState({});
  const [totalIncomes, setTotalIncomes] = useState(0);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData && userData.cards) {
      const selectedCard = userData.cards[0]; // Selecciona la primera tarjeta como ejemplo
      if (selectedCard) {
        if (selectedCard.expenses) {
          const expensesByCategory = selectedCard.expenses.reduce((result, expense) => {
            const category = expense.category;
            if (category in result) {
              result[category] += expense.amount;
            } else {
              result[category] = expense.amount;
            }
            return result;
          }, {});
          setTotalExpensesByCategory(expensesByCategory);
        }
        if (selectedCard.incomes) {
          const totalIncomeAmount = selectedCard.incomes.reduce((total, income) => total + income.amount, 0);
          setTotalIncomes(totalIncomeAmount);
        }
      }
    }
  }, []);

  return (
    <div>
      <h2>Expense Statistics</h2>

      <div className="chart-container">
        <h3>Total Incomes</h3>
        <p>${totalIncomes}</p>
      </div>

      <div className="chart-container">
        <h3>Expenses by Category</h3>
        <ul>
          {Object.entries(totalExpensesByCategory).map(([category, totalAmount]) => (
            <li key={category}>
              Category: {category}, Total Amount: ${totalAmount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Report;
