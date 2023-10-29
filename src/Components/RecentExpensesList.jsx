const RecentExpensesList = ({ recentExpenses }) => (
    <div>
      <h3>Recent Expenses:</h3>
      <ul>
        {recentExpenses.map((expense) => (
          <li key={expense.id}>
            Amount: ${expense.amount}, Category: {expense.category}
          </li>
        ))}
      </ul>
    </div>
  ) 
  export default RecentExpensesList;