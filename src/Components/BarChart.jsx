// Bars.js
import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

const Bars = ({ data, title, xLabel, yLabel, barColor }) => {
  const options = {
    responsive: true,
    animation: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
      },
      x: {
        ticks: { color: 'blue' },
      },
    },
  };

  // Cambia estos colores según tus preferencias
  const backgroundColors = ['#4CAF50', '#FF5722', '#2196F3', '#FFC107', '#9C27B0'];

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: title,
        data: Object.values(data),
        backgroundColor: backgroundColors,
      },
    ],
  };

  const chartRef = useRef(null);

  return (
    <div className="chart-container">
      <h2>{title}</h2>
      <Bar data={chartData} options={options} ref={chartRef} />
    </div>
  );
};

export default Bars;
