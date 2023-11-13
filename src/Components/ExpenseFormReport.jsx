// ExpenseForm.jsx
import React from "react";
import CategorySelect from "./CategorySelect";

const ExpenseFormReport = ({
  selectedCat,

  expenseCategory,
 
  onExpenseCategoryChange,
  
}) => {
  return (
    <div className="add-expense">
      
      <CategorySelect
          selectedCat={selectedCat}
          userCat={expenseCategory}
          handleSelectedCatChange={onExpenseCategoryChange}
          
        />
      
    </div>
  );
}

export default ExpenseFormReport;
