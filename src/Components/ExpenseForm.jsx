// ExpenseForm.jsx
import React from "react";
import CategorySelect from "./CategorySelect";

const ExpenseForm = ({
  selectedCat,
  newExpense,
  expenseCategory,
  
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
      <CategorySelect
          selectedCat={selectedCat}
          userCat={expenseCategory}
          handleSelectedCatChange={onExpenseCategoryChange}
          
        />
      
      
      {warning && <p className="warning">{warning}</p>}
      <button className="button-container" onClick={addNewExpense}>Añadir Gasto</button>
    </div>
  );
}

export default ExpenseForm;
