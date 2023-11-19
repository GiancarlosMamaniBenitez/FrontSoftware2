import React from "react";

const SpendingAndSavings = ({
  spendingLimit,
  savingsGoal,
  handleSpendingLimitChange,
  handleSavingsGoalChange,
  onSaveClick
}) => {
  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
      <div className="d-block ">
      <h3>Limite de gastos:</h3>
      <input
        type="number"
        value={spendingLimit}
        onChange={handleSpendingLimitChange}
        placeholder="Enter Spending Limit"
      />
      </div>
      <div className="d-block"><h3>Meta de Ahorro:</h3>
      <input
        type="number"
        value={savingsGoal}
        onChange={handleSavingsGoalChange}
        placeholder="Enter Savings Goal"
      /></div>
      

      <button className="btn btn-primary my-2" onClick={onSaveClick}>Añadir Limite y Meta</button>
    </div>
  );
};

export default SpendingAndSavings;
