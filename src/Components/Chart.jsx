import React from 'react'
import IngresosApi from '@/app/api_fronted/ingresos';
import GastosApi from '@/app/api_fronted/gastos';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const Chart = ({Ingresos, Gastos}) => {
  
  var options = {
    responsive : true,
    maintainAspectRadio : false,
  };
  
  var data = {
    labels: ['Ingresos','Gastos'],
    datasets : [
      {
        data: [Ingresos, Gastos],
        backgroundColor : [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          
        ],
        borderColor : [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          
        ],
        borderWidth: 1,
      },
    ],

};

return(
  <Pie data={data} options={options}/>
)

}

export default Chart 