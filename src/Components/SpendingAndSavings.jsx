const SpendingAndSavings = ({ spendingLimit, savingsGoal, handleSpendingLimitChange, handleSavingsGoalChange }) => (
    <div>
      <h3>Spending Limit:</h3>
      <input
        type="number"
        value={spendingLimit}
        onChange={handleSpendingLimitChange}
        placeholder="Enter Spending Limit"
      />
  
      <h3>Savings Goal:</h3>
      <input
        type="number"
        value={savingsGoal}
        onChange={handleSavingsGoalChange}
        placeholder="Enter Savings Goal"
      />
    </div>
  )
  export default SpendingAndSavings;