// IncomeForm.jsx
import React from "react";

const IncomeForm = ({ newIncome, onNewIncomeChange, addNewIncome }) => {
  return (
    <div className="add-income">
      <input
        type="number"
        value={newIncome}
        onChange={onNewIncomeChange}
        placeholder="Enter New Income"
      />
      <button onClick={addNewIncome}>Add Income</button>
    </div>
  );
};

export default IncomeForm;
