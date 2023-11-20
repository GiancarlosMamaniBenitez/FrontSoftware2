// IncomeForm.jsx
import React from "react";
import CategorySelect from "./CategorySelect";

const IncomeForm = ({ 
  newIncome, 
  onNewIncomeChange, 
  addNewIncome, 
  selectedCat,
  IncomeCategory, 
  onIncomeCategoryChange
}) => {
  return (
    <div className="add-expense">
      <h3>Ingresos:</h3>
      <input
        type="number"
        value={newIncome}
        onChange={onNewIncomeChange}
        placeholder="Enter New Expense"
      />
      <h3>Origen:</h3>
      <CategorySelect
          selectedCat={selectedCat}
          userCat={IncomeCategory}
          handleSelectedCatChange={onIncomeCategoryChange}
          
        />
      
      
      
      <button className="btn btn-primary" onClick={addNewIncome}>Añadir Ingreso</button>
    </div>
  );
};

export default IncomeForm;
