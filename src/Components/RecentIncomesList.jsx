const RecentIncomesList = ({ recentIncomes }) => (
    <div>
      <h3>Recent Incomes:</h3>
      <ul>
        {recentIncomes.map((income) => (
          <li key={income.id}>Amount: ${income.amount}</li>
        ))}
      </ul>
    </div>
  )
  export default RecentIncomesList;