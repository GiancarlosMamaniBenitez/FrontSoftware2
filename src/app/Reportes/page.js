'use client'
import React, { useState, useEffect } from "react";
import NavBar from "@/Components/NavBar";
import './finances.css'
const Reports = () => {
  const [selectedCard, setSelectedCard] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const [userCards, setUserCards] = useState(user?.cards || []);

  const [selectedReportType, setSelectedReportType] = useState("daily");
  const [selectedReportCategory, setSelectedReportCategory] = useState("");
  const [reports, setReports] = useState([]);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Realizar la lógica de carga de informes desde el almacenamiento local
    // y establecerlos en el estado "reports" cuando la página se monta
    const loadedReports = JSON.parse(localStorage.getItem("reports")) || [];
    setReports(loadedReports);
  }, []);

  const handleSelectedCardChange = (event) => {
    setSelectedCard(event.target.value);
  };

  const handleSelectedReportTypeChange = (event) => {
    setSelectedReportType(event.target.value);
  };

  const handleSelectedReportCategoryChange = (event) => {
    setSelectedReportCategory(event.target.value);
  };

  const generateReport = () => {
    // Realizar la generación de informes y guardarlos en el almacenamiento local
    const currentDate = getCurrentDate();
    const currentMonth = currentDate.slice(0, 7);
    const dailyData = JSON.parse(localStorage.getItem("dailyData")) || {};
    const monthlyData = JSON.parse(localStorage.getItem("monthlyData")) || {};

    const selectedCardData = userCards.find((card) => card.number === selectedCard);
    const category = selectedReportCategory;

    if (selectedReportType === "daily") {
      if (dailyData[currentDate]) {
        const expenses = dailyData[currentDate].expenses[category] || 0;
        const incomes = selectedCardData.incomes || [];

        const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
        const savings = totalIncome - expenses;

        const report = {
          type: "Daily",
          date: currentDate,
          category: category,
          expenses: expenses,
          incomes: totalIncome,
          savings: savings,
        };

        const updatedReports = [...reports, report];
        setReports(updatedReports);

        localStorage.setItem("reports", JSON.stringify(updatedReports));
      }
    } else if (selectedReportType === "monthly") {
      if (monthlyData[currentMonth]) {
        const expenses = monthlyData[currentMonth].expenses[category] || 0;
        const incomes = selectedCardData.incomes || [];

        const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
        const savings = totalIncome - expenses;

        const report = {
          type: "Monthly",
          date: currentMonth,
          category: category,
          expenses: expenses,
          incomes: totalIncome,
          savings: savings,
        };

        const updatedReports = [...reports, report];
        setReports(updatedReports);

        localStorage.setItem("reports", JSON.stringify(updatedReports));
      }
    }
  };

  const handleReportClick = (report) => {
    setReportData(report);
  };

  return (
    <div>
      <NavBar />
      <div className="reports-container">
        <h1>Reports</h1>

        <select value={selectedCard} onChange={handleSelectedCardChange}>
          <option value="">Select a Card</option>
          {userCards.map((card) => (
            <option key={card.number} value={card.number}>
              {card.cardsname} - {card.number}
            </option>
          ))}
        </select>

        <div>
          <label>Report Type:</label>
          <select value={selectedReportType} onChange={handleSelectedReportTypeChange}>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label>Report Category:</label>
          <select value={selectedReportCategory} onChange={handleSelectedReportCategoryChange}>
            <option value="">Select Category</option>
            {userCards.find((card) => card.number === selectedCard)?.categories?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <button className="generate-button" onClick={generateReport}>Generate Report</button>

        <div>
          <h2>Reports List</h2>
          <ul>
            {reports.map((report, index) => (
              <li key={index} onClick={() => handleReportClick(report)}>
                {report.type} Report - {report.date}
              </li>
            ))}
          </ul>
        </div>

        <div>
          {reportData && (
            <div>
              <h2>Report Details</h2>
              <p>Type: {reportData.type}</p>
              <p>Date: {reportData.date}</p>
              <p>Category: {reportData.category}</p>
              <p>Expenses: ${reportData.expenses}</p>
              <p>Incomes: ${reportData.incomes}</p>
              <p>Savings: ${reportData.savings}</p>
              {/* Agregar más detalles según el contenido del informe */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;

// Función para obtener la fecha actual en formato "YYYY-MM-DD"
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
