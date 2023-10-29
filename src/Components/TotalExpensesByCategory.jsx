const TotalExpensesByCategory = ({ totalExpensesByCategory }) => (
    <div>
      <h3>Total Expenses by Category:</h3>
      <ul>
        {Object.entries(totalExpensesByCategory).map(([category, totalAmount]) => (
          <li key={category}>
            Category: {category}, Total Amount: ${totalAmount}
          </li>
        ))}
      </ul>
    </div>
  )
  export default TotalExpensesByCategory;