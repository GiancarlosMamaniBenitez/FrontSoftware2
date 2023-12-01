import React, { useRef, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

import  {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
ChartJS.register(ArcElement, Tooltip,Legend);
const Chart1 = ({ Ingresos, Gastos }) => {
    const options = {
        responsive: false,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 15,
              padding: 15,
              usePointStyle: true,
            },
          },
        },
      };

      const backgroundColors = ['#4CAF50', '#FF5722', '#2196F3', '#FFC107', '#9C27B0'];
      const borderColors = backgroundColors;
    
  const data = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [
      {
        data: [Ingresos, Gastos],
        backgroundColor:backgroundColors ,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const chartRef = useRef(null);

 
  return (
    <div className="chart-container">
      <Pie data={data} options={options} ref={chartRef} />
    </div>
  );
};


export default Chart1;