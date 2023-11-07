import React, { useState } from "react";

const ExpenseForm = ({
  newExpense,
  expenseCategory,
  hasExceededSpendingLimit,
  warning,
  onNewExpenseChange,
  onExpenseCategoryChange,
  addNewExpense,
  onNewCategoryChange,
  addNewCategory,
}) => {
  // State para controlar si se debe mostrar el campo de entrada de nueva categoría
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    onExpenseCategoryChange(selectedCategory);
    // Si se selecciona la opción para crear una nueva categoría, mostrar el campo de entrada
    if (selectedCategory === "createNewCategory") {
      setShowNewCategoryInput(true);
    } else {
      setShowNewCategoryInput(false);
    }
  };

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
      <select value={expenseCategory} onChange={handleCategoryChange}>
        <option value="">Seleccionar una categoría</option>
        {/* Render options for existing categories */}
        <option value="createNewCategory">Crear nueva categoría</option>
      </select>
      {showNewCategoryInput && (
        <div>
          <input
            type="text"
            value={newCategoryInput}
            onChange={(e) => setNewCategoryInput(e.target.value)}
            placeholder="Enter New Category Name"
          />
          <button onClick={() => addNewCategory(newCategoryInput)}>
            Agregar Nueva Categoría
          </button>
        </div>
      )}
      {hasExceededSpendingLimit && (
        <p className="warning">Has superado tu límite de gasto.</p>
      )}
      {warning && <p className="warning">{warning}</p>}
      <button onClick={addNewExpense}>Agregar Gasto</button>
    </div>
  );
};

export default ExpenseForm;
