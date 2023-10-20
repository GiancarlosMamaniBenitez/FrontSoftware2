'use client'
import './reporte.css'
import React, { useEffect, useState } from 'react';
import GraficoPye from '@/Components/Grafico/GraficoPye';
import MenuNuevo from '@/Components/MenuNuevo';
import { autocompleteClasses } from '@mui/material';

const Report = () => {
  const [totalExpensesByCategory, setTotalExpensesByCategory] = useState({});
  const [totalIncomes, setTotalIncomes] = useState(0);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData && userData.cards) {
      const selectedCard = userData.cards[0]; // Selecciona la primera tarjeta como ejemplo
      if (selectedCard) {
        if (selectedCard.expenses) {
          const expensesByCategory = selectedCard.expenses.reduce((result, expense) => {
            const category = expense.category;
            if (category in result) {
              result[category] += expense.amount;
            } else {
              result[category] = expense.amount;
            }
            return result;
          }, {});
          setTotalExpensesByCategory(expensesByCategory);
        }
        if (selectedCard.incomes) {
          const totalIncomeAmount = selectedCard.incomes.reduce((total, income) => total + income.amount, 0);
          setTotalIncomes(totalIncomeAmount);
        }
      }
    }
  }, []);

  return (
    <div>
       <MenuNuevo />
      <div>
        <h1>REPORTE DE INGRESOS Y GASTOS ESTADISTICOS</h1>
      </div>
      <hr/>
      <div class ="Contenedor">
        <div className="chart-container">
          <h2>TOTAL DE INGRESOS</h2>
          <p>${totalIncomes}</p>
        </div>
        <div className="chart-container">
          <h3>Expenses by Category</h3>
          <ul>
          {Object.entries(totalExpensesByCategory).map(([category, totalAmount]) => (
            <li key={category}>
              Category: {category}, Total Amount: ${totalAmount}
            </li>
          ))}
          </ul>
        </div>
        <div className='' style={{width: "20%"}}>
          <GraficoPye
          />
        </div>
        <div>
                <label class="label">MES Y AÑO DE REPORTE</label>
                <br/> 
                <div class="grupo">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <select class="form-select">
                            <option value></option>
                            <option value ="01">Enero</option>
                            <option value ="02">Febrero</option>
                            <option value ="03">Marzo</option>
                            <option value ="04">Abril</option>
                            <option value ="05">Mayo</option>
                            <option value ="06">Junio</option>
                            <option value ="07">Julio</option>
                            <option value ="08">Agosto</option>
                            <option value ="09">Setiembre</option>
                            <option value ="10">Octubre</option>
                            <option value ="11">Noviembre</option>
                            <option value ="11">Diciembre</option>
                        </select>
                        <i class= "icon-angle-down select-form02"></i>
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        <select class="form-select">
                            <option value></option>
                            <option value ="2023">2023</option>
                            <option value ="2024">2024</option>
                            <option value ="2025">2025</option>
                            <option value ="2026">2026</option>
            
                        </select>
                        <i class= "icon-angle-down select-form02"></i>
                    </div>    
                </div>
        </div>
      </div>
      </div>
  );
};

export default Report;
