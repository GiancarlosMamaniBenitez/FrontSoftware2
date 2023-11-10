import React from "react";

const SpendingAndSavings = ({
  spendingLimit,
  savingsGoal,
  handleSpendingLimitChange,
  handleSavingsGoalChange,
 
}) => {
  return (
    <div>
      <h3>Limite de gastos:</h3>
      <input
        type="number"
        value={spendingLimit}
        onChange={handleSpendingLimitChange}
        placeholder="Enter Spending Limit"
      />

      <h3>Meta de Ahorro:</h3>
      <input
        type="number"
        value={savingsGoal}
        onChange={handleSavingsGoalChange}
        placeholder="Enter Savings Goal"
      />

      <button className="button-container" onClick={handleSavingsGoalChange}>Guardar</button>
    </div>
  );
};

export default SpendingAndSavings;
