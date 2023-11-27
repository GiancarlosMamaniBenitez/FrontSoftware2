// En Chart.js
import React, { useRef, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import html2canvas from 'html2canvas';

const Chart = ({ Ingresos, Gastos }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const data = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [
      {
        data: [Ingresos, Gastos],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const imageData = canvas.toDataURL('image/png');
        // Puedes hacer algo con la imagen, como mostrarla en un preview
        console.log(imageData);
      });
    }
  }, [Ingresos, Gastos]);

  return <Pie data={data} options={options} ref={chartRef} />;
};

export default Chart;
