'use client'

import React, { useState, useEffect } from "react";
import NavBar from "@/Components/NavBar";
import "./finances.css";
import CardSelect from "@/Components/CardSelect";
import TarjetasApi from "../api_fronted/tarjetas";
import IngresosApi from "../api_fronted/ingresos";
import GastosApi from "../api_fronted/gastos";
import UsuariosApi from "../api_fronted/usuarios";
import CategoriasApi from "../api_fronted/categorias";
import MetaApi from "../api_fronted/meta";
import LimitgastoApi from "../api_fronted/Limitgasto";
import MetaForm from "@/Components/Meta";
import LimiteForm from "@/Components/LimiteForm";

const Reports = () => {
  const [selectedCard, setSelectedCard] = useState("");

  const [userCards, setUserCards] = useState("");
  const [reporte, setReporte] = useState([]);
  const [selectedReportType, setSelectedReportType] = useState("daily");
  const [selectedReportCategory, setSelectedReportCategory] = useState("");
  const [reportData, setReportData] = useState(null)  ;
  const currentUser = localStorage.getItem("currentUser");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sesion , setSesion] = useState({});
  const [SelectedCard2, setSelectedCard2] = useState("")

  const [listcards, setListCards] = useState([]);
  const [currentIncomesAndExpenses, setCurrentIncomesAndExpenses] = useState({
    incomes: [],
    expenses: [],
  });
  const [ListaIngresos,setListaIngresos] = useState([]);
  const [listGastos, setListGastos] = useState([]);
  const [meta, setlistMeta] = useState([]);
  const [listUsuarios, setListUsuarios] = useState([]);
  //const [nombres, setFirstName] = useState("");
  //const [apellidos, setLastName] = useState("");
  //const [username, setUsername] = useState("");
 // const [contrasenia, setPassword] = useState("*******");
  //const [email, setEmail] = useState("");
  //const [isEditing, setIsEditing] = useState(false);
  const[listLimit, setListLimit] = useState([]);
  const[listCategorias, setListCategorias] = useState([]);
  const LoadData = async() =>{
    const result = await TarjetasApi.findAll();
    const result1  = await IngresosApi.findAll();
    const result2 = await GastosApi.findAll();
    const result3 = await UsuariosApi.findAll();
    const result5 = await CategoriasApi.findAll();
    const result6 = await MetaApi.findAll();
    const result7 = await LimitgastoApi.findAll();
    
    setListCards(result.data)
    setListaIngresos(result1.data)
    setListGastos(result2.data)
    setListUsuarios(result3.data)
    setListCategorias(result5.data)
    setlistMeta(result6.data)
    setListLimit(result7.data)
    
  
   
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
    const selectedCardNumber = event.target.value;
    const selectedCardData = listcards.find((card) => card.number === selectedCardNumber);
    setUserCards(selectedCardData)
    setSelectedCard(selectedCardNumber);
     
    
   
  };

  const handleSelectedReportTypeChange = (event) => {
    setSelectedReportType(event.target.value);
  };

  const handleSelectedReportCategoryChange = (event) => {
    setSelectedReportCategory(event.target.value);
  };

  const generateReport = async () => {
    const currentDate = getCurrentDate();
    const currentMonth = currentDate.slice(0, 7);
  
    const selectedCardData = listcards.find((card) => card.number === selectedCard);
    const category = selectedReportCategory;
  
    try {
      // Obtener datos de ingresos y gastos del backend para la tarjeta seleccionada
      const incomesResponse = await IngresosApi.findAllByCardId(selectedCardData.id);
      const expensesResponse = await GastosApi.findAllByCardId(selectedCardData.id);
  
      const incomes = incomesResponse.data || [];
      const expenses = expensesResponse.data || [];
  
      const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
      const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
      const savings = totalIncome - totalExpenses;
  
      const report = {
        tipo: selectedReportType === "daily" ? "Daily" : "Monthly",
        date: selectedReportType === "daily" ? currentDate : currentMonth,
        categoria: category,
        total_gastos: totalExpenses,
        total_ingresos: totalIncome,
        ahorro: savings,
      };
  
      // Actualizar el "reporte" en la tarjeta seleccionada (en el backend)
      await Re.updateReport(selectedCardData.id, report);
  
      // Actualizar la lista de tarjetas del usuario (en el backend)
      const updatedUserCards = await TarjetasApi.findAllByUserId(sesion.id);
  
      setUserCards(updatedUserCards.data);
  
      // Almacena los cambios en el usuario (localmente, aunque podrías hacerlo en el backend)
      const updatedUser = { ...user, cards: updatedUserCards.data };
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  
      // Obtener el "reporte" actualizado de la tarjeta seleccionada
      const updatedCardData = updatedUserCards.data.find((card) => card.number === selectedCard);
      const updatedReporte = updatedCardData.reporte || [];
  
      // Actualizar el "reporte" en el almacenamiento local (opcional)
      localStorage.setItem("reporte", JSON.stringify(updatedReporte));
  
      setReporte(updatedReporte);
    } catch (error) {
      console.error("Error al generar el informe:", error);
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
          selectedCard={selectedCard}
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

        <div>
          <label>Report Category:</label>
          <select value={selectedReportCategory} onChange={handleSelectedReportCategoryChange}>
            <option value="">Select Category</option>
            {
                listCategorias
                  .filter((category) => category.id_usuario === sesion.id)
                  .map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nombre} {/* Asegúrate de ajustar esto según la estructura de tus categorías */}
                    </option>
                  ))
              }

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
              <p>Tipo: {reportData.tipo}</p>
              <p>Date: {reportData.date}</p>
              <p>Categoria: {reportData.categoria}</p>
              <p>Total de gastos: ${reportData.total_gastos}</p>
              <p>Total de ingresos: ${reportData.total_ingresos}</p>
              <p>Ahorro: ${reportData.ahorro}</p>
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