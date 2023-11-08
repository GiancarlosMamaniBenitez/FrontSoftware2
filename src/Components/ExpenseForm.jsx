// ExpenseForm.jsx
import React from "react";

const ExpenseForm = ({
  newExpense,
  expenseCategory,
  hasExceededSpendingLimit,
  warning,
  onNewExpenseChange,
  onExpenseCategoryChange,
  addNewExpense,
}) => {
  return (
    <div className="add-expense">
      <h3>Gastos:</h3>
      <input
        type="number"
        value={newExpense}
        onChange={onNewExpenseChange}
        placeholder="Enter New Expense"
      />
      <h3>Categoria:</h3>
      <select value={expenseCategory} onChange={onExpenseCategoryChange}>
  {expenseCategory.map((elem, index) => (
    <option key={index} value={expenseCategory}>
      {elem}
      
    </option>
  ))}



      </select>
      {hasExceededSpendingLimit && <p className="warning">Has superado tu límite de gasto.</p>}
      {warning && <p className="warning">{warning}</p>}
      <button className="button-container" onClick={addNewExpense}>Añadir Gasto</button>
    </div>
  );
}

export default ExpenseForm;
