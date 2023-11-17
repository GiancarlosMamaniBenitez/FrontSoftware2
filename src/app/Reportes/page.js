'use client'
import jsPDF from "jspdf";
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
import ReportesApi from "../api_fronted/reportes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown } from '@fortawesome/free-solid-svg-icons';
const Reports = () => {
  const [selectedCard, setSelectedCard] = useState("");

  const [userCards, setUserCards] = useState("");
  const [selectedReportType, setSelectedReportType] = useState("daily");
  const [selectedReportCategory, setSelectedReportCategory] = useState("");
  const [reportData, setReportData] = useState(null)  ;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sesion , setSesion] = useState({});
 
  const [categorias, setCategorias] = useState([])
  const [listcards, setListCards] = useState([]);
  const [currentIncomesAndExpenses, setCurrentIncomesAndExpenses] = useState({
    incomes: [],
    expenses: [],
  });

  const [ListaIngresos,setListaIngresos] = useState([]);
  const [listGastos, setListGastos] = useState([]);
  const [meta, setlistMeta] = useState([]);
  const [listUsuarios, setListUsuarios] = useState([]);

  const[listLimit, setListLimit] = useState([]);
  const[listCategorias, setListCategorias] = useState([]);
  const [ listReport , setListReport ] = useState([])
  const [ userReport, setUserReport] = useState([]);
  
  
  
  const LoadData = async() =>{
    const result = await TarjetasApi.findAll();
    const result1  = await IngresosApi.findAll();
    const result2 = await GastosApi.findAll();
    const result3 = await UsuariosApi.findAll();
    const result5 = await CategoriasApi.findAll();
    const result6 = await MetaApi.findAll();
    const result7 = await LimitgastoApi.findAll();
    const result8 = await ReportesApi.findAll();
    setListCards(result.data)
    setListaIngresos(result1.data)
    setListGastos(result2.data)
    setListUsuarios(result3.data)
    setListCategorias(result5.data)
    setlistMeta(result6.data)
    setListLimit(result7.data)
    setListReport(result8.data)
    
  
   
  }
    
  const handleOnLoad = () => {

    let sesionGuardada = localStorage.getItem("sesion");
    setSesion(JSON.parse(sesionGuardada))
    console.log(sesion)
   
               
}
useEffect(() => {
    
  handleOnLoad();
  LoadData()
  
  
  

      
}, []);
  useEffect(() => {

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
    console.log(event.target.value)
  };

  const handleSelectedReportCategoryChange = (event) => {
    const selectedcategoriID  = event.target.value;
    const cat = listCategorias.find((e) => e.id == selectedcategoriID);
    const nombrecat = cat.nombre
    console.log(nombrecat)
    setSelectedReportCategory(event.target.value);
    setCategorias(nombrecat)

  };
  const generateReport = async () => {
    
    const currentDate = getCurrentDate();
    const currentMonth = currentDate.slice(0, 7);
  
    const selectedCardData = listcards.find((card) => card.number === selectedCard);
    const category = selectedReportCategory;
    
    const tarjeta = listcards.find((e) => e.id == selectedCardData.id);
  let reportestarjeta = []
   reportestarjeta = listReport.filter((e) => e.id_tarjeta == tarjeta.id);
    setUserReport(reportestarjeta)
  
   // Filtrar ingresos y gastos según el tipo de informe
    const ingresosusuario = selectedReportType === "daily"
      ? ListaIngresos.filter((e) => e.id_tarjeta === tarjeta.id && e.fecha_ingresos === currentDate)
      : ListaIngresos.filter((e) => e.id_tarjeta === tarjeta.id && e.fecha_ingresos.startsWith(currentMonth));
  
    const gastosusuario = selectedReportType === "daily"
      ? listGastos.filter((e) => e.id_tarjeta === tarjeta.id && e.fecha_gastos === currentDate)
      : listGastos.filter((e) => e.id_tarjeta === tarjeta.id && e.fecha_gastos.startsWith(currentMonth));
  
    const totalMonto = ingresosusuario.reduce((total, ingreso) => total + parseFloat(ingreso.monto), 0);
    const totalGastos = gastosusuario.reduce((total, gasto) => total + parseFloat(gasto.monto), 0);
  
    console.log("Total de gastos:", totalGastos);
    console.log("Total de montos:", totalMonto);
  
    const gastosusuarioFiltrados = selectedReportCategory
      ? gastosusuario.filter((gasto) => gasto.id_categoria === selectedReportCategory)
      : gastosusuario;

    const gastosPorCategoria = selectedReportCategory
      ? gastosusuarioFiltrados.reduce((acumulador, gasto) => {
          const categoriaId = gasto.id_categoria;
          const categoria = listCategorias.find((cat) => cat.id === categoriaId);
          const nombreCategoria = categoria ? categoria.nombre : "Sin Categoría";
          setCategorias(categoria.nombre)
         
          acumulador[nombreCategoria] = (acumulador[nombreCategoria] || 0) + parseFloat(gasto.monto);
          return acumulador;
        }, {})
      : {};
  
    console.log("Gastos por categoría:", gastosPorCategoria);
  
    const savings = totalMonto - totalGastos;
    const reportesId = listReport.length + 1;
    const catId = parseInt(selectedReportCategory, 10);
  
    const report = {
      id_reportes: reportesId,
      tipo: selectedReportType === "daily" ? "Daily" : "Monthly",
      fecha_reportes: selectedReportType === "daily" ? currentDate : currentMonth,
      id_tarjeta: tarjeta.id,
      id_categoria: catId || null, // Usa null si no hay categoría seleccionada
      totalGastos: totalGastos,
      totalIngresos: totalMonto,
      ahorro: savings,
    };
  
    console.log(report);
  
    try {
      const response = await ReportesApi.create(report);
      LoadData();
     
      LoadData();
      if (response && response.status === 200) {
        alert('Reporte generado exitosamente!');
      } else {
        alert('Error al generar el reporte');
      }
    } catch (error) {
      console.error("Error al generar el informe:", error);
    }
  };


  
  
  

  const generateReportPDF = async (report) => {
    console.log(selectedReportCategory)
    console.log(selectedCard)

  
    //const nombrecat = cat.nombre
   
    const pdfDoc = new jsPDF();

    // Título y Estilo
    pdfDoc.setFontSize(18);
    pdfDoc.text(" Reporte Financiero", 105, 15, { align: "center" });
    
    // Contenido del Informe
    pdfDoc.setFontSize(14);
    pdfDoc.text(`Tipo de Informe: ${report.tipo == 'daily' ? 'Diario' : 'Mensual'}`, 10, 30);
    pdfDoc.text(`Fecha del Informe: ${report.fecha_reportes}`, 10, 45);
    
    // Obtener el nombre de la tarjeta
    pdfDoc.text(`Nombre de la Tarjeta: ${selectedCard ? selectedCard : 'Sin Tarjeta'}`, 10, 60);

    // Obtener el nombre de la categoría
    const category = listCategorias.find((cat) => cat.id == report.id_categoria);
    console.log(categorias)
    pdfDoc.text(`Categoría: ${categorias ? categorias : 'Sin Categoría'}`, 10, 75);
    
    pdfDoc.text(`Total de Gastos: $${report.totalGastos}`, 10, 90);
    pdfDoc.text(`Total de Ingresos: $${report.totalIngresos}`, 10, 105);
    pdfDoc.text(`Ahorro: $${report.ahorro}`, 10, 120);
    
    // Pie de Página
    pdfDoc.setLineWidth(1.5); 
    pdfDoc.line(10, 135, 200, 135);
    pdfDoc.setFontSize(12);
    pdfDoc.text("¡Gracias por utilizar nuestro servicio de reportes financieros!", 105, 142, { align: "center" });
    
    // Guardar el PDF
    pdfDoc.save(`Informe_${report.id_reportes}.pdf`);
  }    

    
  

  return (
    <div className="text-center"> {/* Agregado para centrar todo */}
      <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion}/>
      <div className={`reports-container${isSidebarOpen ? '-shifted' : ''} mx-auto`}>
        <h1>Reports</h1>

        <div className="card mx-auto">
          <CardSelect
            selectedCard={selectedCard}
            userCards={listcards.filter((e) => e.id_usuario == sesion.id)}
            handleSelectedCardChange={handleSelectedCardChange}
          />
        </div>

        <div className="mx-auto">
          <label>Report Type:</label>
          <select className="form-control" value={selectedReportType} onChange={handleSelectedReportTypeChange}>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="mx-auto">
          <label>Report Category:</label>
          <select className="form-control" value={selectedReportCategory} onChange={handleSelectedReportCategoryChange}>
            <option value="">Select Category</option>
            {listCategorias
              .filter((category) => category.id_usuario === sesion.id)
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nombre}
                </option>
              ))}
          </select>
        </div>

        <button className ="button-report" onClick={generateReport}>Generate Report</button>

        <div className="table-container">
      {userReport.length > 0 && (
        <div className="container mt-4">
          <h2 className="table-title">Reports List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Numero</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {userReport.map((report, index) => (
                <tr key={index}>
                  <td>{report.id_reportes}</td>
                  
                  <td>{report.tipo.trim().toLowerCase() === "daily" ? "Diario" : "Mensual"}</td>

                  <td>{report.fecha_reportes}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => generateReportPDF(report)}>
                    <FontAwesomeIcon icon={faCircleDown} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
