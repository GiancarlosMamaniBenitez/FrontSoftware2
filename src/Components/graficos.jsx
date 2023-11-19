const FinancesChart = ({ totalIncomeAmount, totalExpenseAmount, savingsGoal }) => {
    const data = {
      labels: ['Ingresos', 'Gastos', 'Ahorro'],
      datasets: [
        {
          data: [totalIncomeAmount, totalExpenseAmount, savingsGoal],
          backgroundColor: ['#4CAF50', '#FF5733', '#3498DB'],
        },
      ],
    };
  
    return <Doughnut data={data} />;
  };
  