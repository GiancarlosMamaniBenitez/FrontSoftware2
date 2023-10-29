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
      <input
        type="number"
        value={newExpense}
        onChange={onNewExpenseChange}
        placeholder="Enter New Expense"
      />
      <select value={expenseCategory} onChange={onExpenseCategoryChange}>
        {/* Render options for categories */}
      </select>
      {hasExceededSpendingLimit && <p className="warning">Has superado tu límite de gasto.</p>}
      {warning && <p className="warning">{warning}</p>}
      <button onClick={addNewExpense}>Add Expense</button>
    </div>
  );
}

export default ExpenseForm;
