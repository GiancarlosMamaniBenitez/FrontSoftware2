'use client'

import React, { useState, useEffect } from "react";
import NavBar from "@/Components/NavBar";
import "./finances.css";
import CardSelect from "@/Components/CardSelect";
import TarjetasApi from "../api_fronted/tarjetas";
import IngresosApi from "../api_fronted/ingresos";
import GastosApi from "../api_fronted/gastos";
import UsuariosApi from "../api_fronted/usuarios";
import ExpenseFormReport from "@/Components/ExpenseFormReport";

const Reports = () => {
  const [selectedCard, setSelectedCard] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const [userCards, setUserCards] = useState(user?.cards || []);
  const [reporte, setReporte] = useState([]);
  const [selectedReportType, setSelectedReportType] = useState("daily");
  const [selectedReportCategory, setSelectedReportCategory] = useState("");
  const [reportData, setReportData] = useState(null);
  const currentUser = localStorage.getItem("currentUser");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sesion , setSesion] = useState({});
  const [SelectedCard2, setSelectedCard2] = useState("")
  const [listCategorias, setListCategorias] = useState([]);

  const [listcards, setListCards] = useState([]);
  const [currentIncomesAndExpenses, setCurrentIncomesAndExpenses] = useState({
    incomes: [],
    expenses: [],
  });
  const [ListaIngresos,setListaIngresos] = useState([]);
  const [listGastos, setListGastos] = useState([]);
  const [listUsuarios, setListUsuarios] = useState([]);
  //const [nombres, setFirstName] = useState("");
  //const [apellidos, setLastName] = useState("");
  //const [username, setUsername] = useState("");
 // const [contrasenia, setPassword] = useState("*******");
  //const [email, setEmail] = useState("");
  //const [isEditing, setIsEditing] = useState(false);
  const LoadData = async() =>{
    const result = await TarjetasApi.findAll();
    const result1  = await IngresosApi.findAll();
    const result2 = await GastosApi.findAll();
    const result3 = await UsuariosApi.findAll();
    setListCards(result.data)
    setListaIngresos(result1.data)
    setListGastos(result2.data)
    setListUsuarios(result3.data)
    setListCategorias(result5.data)
    
  }
  const handleOnLoad = () => {

    let sesionGuardada = localStorage.getItem("sesion");
    setSesion(JSON.parse(sesionGuardada))
    console.log(sesion)
               
}
useEffect(() => {
    
  handleOnLoad();
  LoadData()
  
  
  
  //tarjetaLocal();
      
}, []);
  useEffect(() => {
   // Verifica si el usuario ha iniciado sesión
   const loadedReporte = JSON.parse(localStorage.getItem("reporte")) || [];
    let sesionGuardada = localStorage.getItem("sesion");
        if(sesionGuardada == undefined){
          alert("No hya sesion guardada")
            router.push('/Login')
        }
        setSesion(JSON.parse(sesionGuardada))
        console.log(sesion)
  }, []);
  

  const handleSelectedCardChange = (event) => {  
    const selectedCardData = listcards.find((e) => e.number === event.target.value);
    setSelectedCard(selectedCardData); 
    setSelectedCard2(selectedCardData.number); 
    console.log(selectedCardData)
  };

  const handleSelectedReportTypeChange = (event) => {
    setSelectedReportType(event.target.value);
  };

  const handleSelectedReportCategoryChange = (event) => {
    setSelectedReportCategory(event.target.value);
  };

  const handleSelectedCategorieChange = (event) => {
    const selectedCat = listCategorias.find((e) => e.nombre === event.target.value);
    setSelectedCategorie(selectedCat.nombre); 
    setSelectedCategorieId(selectedCat.id);
    
    console.log(selectedCat)
  }

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

        // Obtén el "reporte" actual de la tarjeta seleccionada
        const currentReporte = selectedCardData.reporte || [];
        const updatedReporte = [...currentReporte, report];
        
        // Actualiza el "reporte" en la tarjeta seleccionada
        selectedCardData.reporte = updatedReporte;

        // Encuentra la tarjeta seleccionada en la lista de tarjetas del usuario
        const updatedUserCards = userCards.map((card) => {
          if (card.number === selectedCard) {
            return selectedCardData;
          }
          return card;
        });

        // Actualiza la lista de tarjetas del usuario
        setUserCards(updatedUserCards);

        // Almacena los cambios en el usuario
        setUser({ ...user, cards: updatedUserCards });
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Actualiza el "reporte" en el almacenamiento local
        localStorage.setItem("reporte", JSON.stringify(updatedReporte));
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

        // Obtén el "reporte" actual de la tarjeta seleccionada
        const currentReporte = selectedCardData.reporte || [];
        const updatedReporte = [...currentReporte, report];
        
        // Actualiza el "reporte" en la tarjeta seleccionada
        selectedCardData.reporte = updatedReporte;

        // Encuentra la tarjeta seleccionada en la lista de tarjetas del usuario
        const updatedUserCards = userCards.map((card) => {
          if (card.number === selectedCard) {
            return selectedCardData;
          }
          return card;
        });

        // Actualiza la lista de tarjetas del usuario
        setUserCards(updatedUserCards);

        // Almacena los cambios en el usuario
        setUser({ ...user, cards: updatedUserCards });
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Actualiza el "reporte" en el almacenamiento local
        localStorage.setItem("reporte", JSON.stringify(updatedReporte));
      
        
      }
    }
  };

  const handleReportClick = (report) => {
    setReportData(report);
  };

  return (
    <div>
      <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion}/>
      <div className={`reports-container${isSidebarOpen ? '-shifted' : ''}`}>
        <h1>Reports</h1>

        <div className="card"><CardSelect
          selectedCard={SelectedCard2}
          userCards={listcards.filter((e) => e.id_usuario == sesion.id)}
          handleSelectedCardChange={handleSelectedCardChange}
        /></div>

        <div>
          <label>Report Type:</label>
          <select value={selectedReportType} onChange={handleSelectedReportTypeChange}>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <label>Report Category:</label>
        <div>
        <ExpenseFormReport
              
              selectedCat = {selectedCategorie}
              
              expenseCategory={listCategorias.filter((e) => e.id_usuario == sesion.id)}
             
              onExpenseCategoryChange={handleSelectedCategorieChange}
             />
          
          <select value={selectedReportCategory} onChange={handleSelectedReportCategoryChange}>
            <option value="">Select Category</option>
            {userCards.find((card) => card.number === selectedCard)?.categories?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <button className ="button-report" onClick={generateReport}>Generate Report</button>

        <div>
          <h2>Reports List</h2>
          <ul>
            {reporte.map((report, index) => (
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