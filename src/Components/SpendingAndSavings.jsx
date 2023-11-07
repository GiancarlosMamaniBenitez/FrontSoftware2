const SpendingAndSavings = ({ spendingLimit, savingsGoal, handleSpendingLimitChange, handleSavingsGoalChange }) => (
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
    </div>
  )
  export default SpendingAndSavings;