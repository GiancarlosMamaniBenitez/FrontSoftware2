// IncomeForm.jsx
import React from "react";

const IncomeForm = ({ newIncome, onNewIncomeChange, addNewIncome }) => {
  return (
    <div className="add-income">
       <h3>Ingresos:</h3>
      <input
        type="number"
        value={newIncome}
        onChange={onNewIncomeChange}
        placeholder="Enter New Income"
      />
      <button onClick={addNewIncome}>Agregar ingreso</button>
    </div>
  );
};

export default IncomeForm;
