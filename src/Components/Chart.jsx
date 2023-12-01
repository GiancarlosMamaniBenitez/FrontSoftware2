// Chart.js
import React, { useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ data }) => {
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

  const chartData = {
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
    labels: Object.keys(data),
  };

  const chartRef = useRef(null);

  return (
    <div className="chart-container">
      <Pie data={chartData} options={options} ref={chartRef} />
    </div>
  );
};

export default Chart;
