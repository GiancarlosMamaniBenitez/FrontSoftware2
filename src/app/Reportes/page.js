'use client'
import jsPDF from "jspdf";
import React, { useState, useEffect } from "react";
import NavBar from "@/Components/NavBar";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "./finances.css";
import CardSelect from "@/Components/CardSelect";
import TarjetasApi from "../api_fronted/tarjetas";
import IngresosApi from "../api_fronted/ingresos";
import GastosApi from "../api_fronted/gastos";
import UsuariosApi from "../api_fronted/usuarios";
import CategoriasApi from "../api_fronted/categorias";
import MetaApi from "../api_fronted/meta";
import LimitgastoApi from "../api_fronted/Limitgasto";
import Chart from "@/Components/Chart";
import html2canvas from 'html2canvas';
import ReportesApi from "../api_fronted/reportes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePDF } from 'react-to-pdf';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import OrigenApi from "../api_fronted/origen";
import { faCircleDown, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";
import { data } from "jquery";
const Reports = () => {
  const [ nombreCat, setNombreCat] = useState("")
  const [gastosPorCategoria, setGastosPorCategoria] = useState([]);
  const[totalGastos1,setTotalGastos1] =useState()
  const [totalIngresos, setTotalIngresos] = useState()
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedCard2, setSelectedCard2] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [userCards, setUserCards] = useState("");
  const [selectedReportType, setSelectedReportType] = useState("daily");
  const [selectedReportInform, setSelectedReportInform] = useState("general");
  const [selectedReportCategory, setSelectedReportCategory] = useState("");
  const [reportData, setReportData] = useState(null)  ;
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sesion , setSesion] = useState({});
 const [usuarioRepo , setUsuarioRepo] = useState([])
  const [categorias, setCategorias] = useState([])
  const [listcards, setListCards] = useState([]);


  const [ListaIngresos,setListaIngresos] = useState([]);
  const [listGastos, setListGastos] = useState([]);
  const [meta, setlistMeta] = useState([]);
  const [listUsuarios, setListUsuarios] = useState([]);

  const[listLimit, setListLimit] = useState([]);
  const[listCategorias, setListCategorias] = useState([]);
  const [ listReport , setListReport ] = useState([])
  const [ userReport, setUserReport] = useState([]);
  const router = useRouter();
  const [listOrigen, setListOrigen ] = useState ([])
  const[selectedReportOrigen,setSelectedReportOrigen]= useState("")
  const[origen,setOrigen]= useState([])
  const [ingresosPorOrigen, setIngresosPorOrigen] = useState([])
  const LoadData = async() =>{
    const result = await TarjetasApi.findAll();
    const result1  = await IngresosApi.findAll();
    const result2 = await GastosApi.findAll();
    const result3 = await UsuariosApi.findAll();
    const result5 = await CategoriasApi.findAll();
    const result6 = await MetaApi.findAll();
    const result7 = await LimitgastoApi.findAll();
    const result8 = await ReportesApi.findAll();
    const result9 = await OrigenApi.findAll();
    setListCards(result.data)
    setListaIngresos(result1.data)
    setListGastos(result2.data)
    setListUsuarios(result3.data)
    setListCategorias(result5.data)
    setlistMeta(result6.data)
    setListLimit(result7.data)
    setListReport(result8.data)
    setListOrigen(result9.data)
  }

  const handleOnLoad = () => {

    let sesionGuardada = localStorage.getItem("sesion");
    setSesion(JSON.parse(sesionGuardada))
    console.log(sesion)
   
               
}

  

useEffect(() => {
    
  handleOnLoad();
  LoadData();
  
      
}, []);
const handleBuscarRepo = () => {
  
  router.push('/BuscarRepo')
};
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
    
      const numero = event.target.value
      
        const selectedCardData = listcards.find((card) => card.number == numero);
        setUserCards(selectedCardData)
        if(numero){
          setSelectedCard2(selectedCardData.number);
        setSelectedCard(selectedCardData);
        const listarepo = listReport.filter((e) => e.id_tarjeta === selectedCardData.id);
        console.log(listarepo)
        setUsuarioRepo(listarepo)
      
        }
        
        else{
          setSelectedCard(null)
          setSelectedCard2(null)
        }
        
       

  };

  const handleSelectedReportTypeChange = (event) => {
    setSelectedReportType(event.target.value);
    console.log(event.target.value)
  };

   const handleSelectedReportInformeChange =(event) => {
    setSelectedReportInform(event.target.value);
    console.log(event.target.value)
  };

  const handleSelectedReportCategoryChange = (event) => {
    
    const selectedcategoriID  = event.target.value;
    if (selectedcategoriID){
    const cat = listCategorias.find((e) => e.id == selectedcategoriID);
    const nombrecat = cat.nombre;
    console.log(nombrecat)
    setSelectedReportCategory(event.target.value);
    setCategorias(nombrecat)
    }else{
      setSelectedReportCategory(null);
    setCategorias(null)
    }
  };
  const handleSelectedReportOrigenChange = (event) => {
    
    const selectedOrigenID  = event.target.value;
    if (selectedOrigenID){
    const origen = listOrigen.find((e) => e.id == selectedOrigenID);
    const nombreOrigen = origen.nombre;
    console.log(nombreOrigen)
   
    setSelectedReportOrigen(event.target.value);
    setOrigen(nombreOrigen)
    }else{
      setSelectedReportOrigen(null);
      setOrigen(null)
    }
  };
  const generateReport = async () => {
    
        const currentDate = getCurrentDate();
        const currentMonth = currentDate.slice(0, 7);

        const selectedCardData = listcards.find((card) => card.number === selectedCard2);
        console.log(selectedCardData)
        const category = selectedReportCategory;
        const origen = selectedReportOrigen;
        const tarjeta = listcards.find((e) => e.id == selectedCardData.id);
      let reportestarjeta = []
      reportestarjeta = listReport.filter((e) => e.id_tarjeta == tarjeta.id);
        setUserReport(reportestarjeta)
        setUsuarioRepo(reportestarjeta)

    //Reporte general o detallado

      
      // Filtrar ingresos y gastos según el tipo de informe
        const ingresosusuario = selectedReportType === "daily"
          ? ListaIngresos.filter((e) => e.id_tarjeta === tarjeta.id && e.fecha_ingresos === currentDate)
          : ListaIngresos.filter((e) => e.id_tarjeta === tarjeta.id && e.fecha_ingresos.startsWith(currentMonth));
      
        const gastosusuario = selectedReportType === "daily"
          ? listGastos.filter((e) => e.id_tarjeta === tarjeta.id && e.fecha_gastos === currentDate)
          : listGastos.filter((e) => e.id_tarjeta === tarjeta.id && e.fecha_gastos.startsWith(currentMonth));
      
        const totalMonto = ingresosusuario.reduce((total, ingreso) => total + parseFloat(ingreso.monto), 0);
        const totalGastos = gastosusuario.reduce((total, gasto) => total + parseFloat(gasto.monto), 0);
      
      console.log("ingresos : " ,totalMonto)
      //Ingreso
      const ingrsosusuarioFiltrados = selectedReportOrigen
          ? ingresosusuario.filter((ingreso) => ingreso.id_origen == selectedReportOrigen)
          : ingresosusuario;
      console.log(ingrsosusuarioFiltrados)
      const totalMontoIngresosOrigen = ingrsosusuarioFiltrados.reduce((total, ingreso) => {
        return total + parseFloat(ingreso.monto);
      }, 0);
      setIngresosPorOrigen(ingrsosusuarioFiltrados);
      console.log("Total de ingresos por categoría:", totalMontoIngresosOrigen);
      //Gastos
        const gastosusuarioFiltrados = selectedReportCategory
          ? gastosusuario.filter((gasto) => gasto.id_categoria == selectedReportCategory)
          : gastosusuario;
      console.log(gastosusuarioFiltrados)
      const totalMontoGastosCat = gastosusuarioFiltrados.reduce((total, gasto) => {
        return total + parseFloat(gasto.monto);
      }, 0);
      setGastosPorCategoria(gastosusuarioFiltrados);

      
      console.log("Total de gastos por categoría:", totalMontoGastosCat);
      
          
        
      
             const savings = totalMonto - totalGastos;
             console.log(listReport.length + 1)
       
             // Obtén el último reporte en la lista
const ultimoReporte = listReport[listReport.length - 1];
console.log("ultimo reporte",ultimoReporte)
// Genera el nuevo ID sumándole 1 al ID del último reporte
const nuevoId = ultimoReporte ? ultimoReporte.id_reportes + 1 : 1;

// Utiliza el nuevo ID en tu lógica
const reportesId = nuevoId;

        const catId = parseInt(selectedReportCategory, 10);
        console.log(selectedReportCategory)
        const origenId = parseInt(selectedReportOrigen, 10);
        console.log(selectedReportOrigen)
        let report; // Declarar la variable para contener el objeto report


 
    report = {
      id_reportes: reportesId,
      tipo: selectedReportType === 'daily' ? "Daily" : "Monthly",
      informe: selectedReportInform === "general" ? "General" : "Detallado",
      fecha_reportes: selectedReportType === "daily" ? currentDate : currentMonth,
      id_tarjeta: tarjeta.id,
      id_origen: origenId || 0,
      id_categoria: catId || 0, // Usa null si no hay categoría seleccionada
      totalGastos: totalMontoGastosCat,
      totalIngresos: totalMonto,
      ahorro: savings,

      
    };
    if(report){
      setTotalGastos1(totalMontoGastosCat)
      setTotalIngresos(totalMonto)
    }
    else{
      setTotalGastos1(totalMontoGastosCat)
      setTotalIngresos(totalMonto)
    }
    
  setReportData(report);
  console.log(reportData);
      
        try {
          const response = await ReportesApi.create(report);
          LoadData();
        
          LoadData();
          if (response && response.status === 200) {
            alert('Reporte generado exitosamente!');
            setUsuarioRepo([...usuarioRepo, response.data]);
          } 
          else {
            alert('Error al generar el reporte');
          }
        } catch (error) {
          console.error("Error al generar el informe:", error);
        }
  };



  
  
  

  const generateReportPDF = async (report) => {
    console.log(selectedReportCategory)
    console.log(selectedCard)

  
    
    const pdfDoc = new jsPDF();

    const addContentToPage = (content, yOffset, maxY, fontSize = 14, color = "black") => {
      if (yOffset > maxY) {
        pdfDoc.addPage();
        yOffset = 15; // Ajusta el valor según sea necesario para el espacio del encabezado en la nueva página.
      }
    
      pdfDoc.setTextColor(color);
      pdfDoc.setFontSize(fontSize);
      pdfDoc.text(content, 10, yOffset);
    
      return yOffset + 15; // Incrementa según sea necesario para el espacio entre líneas.
    };
    
    // Título y Estilo
    let yOffset = 15;
    yOffset = addContentToPage("Reporte Financiero", yOffset, 200, 18, "blue");
    
    // Contenido del Informe
    yOffset = addContentToPage(`Tipo de Informe: ${report.tipo == 'daily' ? 'Diario' : 'Mensual'}`, yOffset, 200);
    yOffset = addContentToPage(`Fecha del Informe: ${report.fecha_reportes}`, yOffset, 200);
    yOffset = addContentToPage(`Nombre de la Tarjeta: ${selectedCard2 ? selectedCard2 : 'Sin Tarjeta'}`, yOffset, 200);
   
    if (selectedReportInform === "general") {
      yOffset = addContentToPage(`Total de Ingresos: $${report.totalIngresos}`, yOffset, 200, 16, "purple");
      yOffset = addContentToPage(`Total de Gastos: $${report.totalGastos}`, yOffset, 200, 16, "red");
    } else {
      if (ingresosPorOrigen.length > 0) {
        yOffset = addContentToPage("Ingresos por Categoría:", yOffset, 200, 16, "green");
        console.log(ingresosPorOrigen)
        // Sumar montos de gastos con el mismo ID
        const ingresoSumados = ingresosPorOrigen.reduce((acumulador, ingreso) => {
          const idOrigen = ingreso.id_origen;
          const nombreOrigen = listOrigen.find((e) => e.id === idOrigen)?.nombre || 'Sin Categoría';
          acumulador[nombreOrigen] = (acumulador[nombreOrigen] || 0) + parseFloat(ingreso.monto);
          return acumulador;
        }, {});
    
        for (const [nombreOrigen, monto] of Object.entries(ingresoSumados)) {
          yOffset = addContentToPage(`Categoría: ${nombreOrigen} - Monto Total: $${monto.toFixed(2)}`, yOffset, 200, 14, "blue");
        }
      }
      // Gastos por categoría
      if (gastosPorCategoria.length > 0) {
        yOffset = addContentToPage("Gastos por Categoría:", yOffset, 200, 16, "green");
    console.log(gastosPorCategoria)
        // Sumar montos de gastos con el mismo ID
        const gastosSumados = gastosPorCategoria.reduce((acumulador, gasto) => {
          const idCategoria = gasto.id_categoria;
          const nombrecat = listCategorias.find((e) => e.id === idCategoria)?.nombre || 'Sin Categoría';
          acumulador[nombrecat] = (acumulador[nombrecat] || 0) + parseFloat(gasto.monto);
          return acumulador;
        }, {});
    
        for (const [nombreCat, monto] of Object.entries(gastosSumados)) {
          yOffset = addContentToPage(`Categoría: ${nombreCat} - Monto Total: $${monto.toFixed(2)}`, yOffset, 200, 14, "blue");
        }
      }
      // Renderizar el gráfico en un elemento invisible
 
      // Resto de la información
      
      yOffset = addContentToPage(`Ahorro: $${report.ahorro}`, yOffset, 200, 16, "orange");
    }
    
    // Pie de Página
    addContentToPage("¡Gracias por utilizar nuestro servicio de reportes financieros!", yOffset, 200, 14, "gray");
    
    // Guardar el PDF
    pdfDoc.save(`Informe_${report.id_reportes}.pdf`);
    
    
  }
  
  const handleEliminar = async (report) => {
    try {
      const response = await ReportesApi.remove(report.id_reportes);
      if (response && response.status === 200) {
          // Eliminación exitosa
          alert('Eliminación exitosa');
          const nuevosReportesFiltrados = reportesFiltrado.filter((r) => r.id_reportes !== report.id_reportes);
          setReportesFiltrado(nuevosReportesFiltrados);
      } else {
          // Manejo de errores en caso de que algo salga mal en el backend
          alert('Error al eliminar ingreso');
      }
  } catch (error) {
      console.error('Error en la solicitud de eliminación:', error);
  }

  }
  const handleGraficos = async(report) =>{
    window.location.href = `/VerGraficos?id=${report.id_reportes}`;
  }
  return (
    <div className="text-center" > {/* Agregado para centrar todo */}
      <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion}/>
      <div className={`reports-container${isSidebarOpen ? '-shifted' : ''} mx-auto`}>
        <h1 className="tituloReporte">Reportes</h1>

        <div className="card mx-auto">
          <label className="subtituloReporte">Tarjeta:</label>
          <CardSelect
            selectedCard={selectedCard2}
            userCards={listcards.filter((e) => e.id_usuario == sesion.id)}
            handleSelectedCardChange={handleSelectedCardChange}
          />
        </div>

        <div  className="mx-auto">
          <label className="subtituloReporte">Tipo de informe:</label>
          <select className="form-control" value={selectedReportInform} onChange={handleSelectedReportInformeChange}>
            <option value="general">General</option>
            <option value="detallado">Detallado</option>      
          </select>
        </div>

        <div className="mx-auto">
          <label className="subtituloReporte">Tipo de reporte:</label>
          <select className="form-control" value={selectedReportType} onChange={handleSelectedReportTypeChange}>
            <option value="daily">Diario</option>
            <option value="monthly">Mensual</option>
          </select>
        </div>

        <div  className="mx-auto">
          <label className="subtituloReporte">Categoria de gastos:</label>
          <select className="form-control" value={selectedReportCategory} onChange={handleSelectedReportCategoryChange}>
            <option value="">Escoge la Categoria</option>
            {listCategorias
              .filter((category) => category.id_usuario === sesion.id)
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nombre}

                </option>
              ))}
          </select>
        </div>
        <div  className="mx-auto">
          <label className="subtituloReporte">Categoria  de Ingresos:</label>
          <select className="form-control" value={selectedReportOrigen} onChange={handleSelectedReportOrigenChange}>
            <option value="">Escoge la Categoria </option>
            {listOrigen
              .filter((origen) => origen.id_usuario === sesion.id)
              .map((origen) => (
                <option key={origen.id} value={origen.id}>
                  {origen.nombre}

                </option>
              ))}
          </select>
        </div>
        <button className="button-report" onClick={() => handleBuscarRepo()} disabled={refreshing}>
          Buscar Reporte
          {refreshing && <FontAwesomeIcon icon={faSyncAlt} spin style={{ marginLeft: '5px' }} />}
        </button>
        <button className ="button-report" onClick={generateReport}>Generar Reporte</button>
        
                

        <div className="table-container">
 
        <div className="container mt-4">
          <h2 className="table-title">Lista de reportes</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Numero</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Descargar</th>
                <th>Graficos</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            
            <tbody>
                {selectedCard &&
                  usuarioRepo.slice(-5).map((report, index) => (
                    <tr key={index}>
                      <td>{report.id_reportes}</td>
                      <td>{report.tipo.trim().toLowerCase() === "daily" ? "Diario" : "Mensual"}</td>
                      <td>{report.fecha_reportes}</td>
                      <td>
                        <button className="btn btn-primary" onClick={() => generateReportPDF(report)}>
                          <FontAwesomeIcon icon={faCircleDown} style={{ color: 'black' }} />
                        </button>
                        </td>
                        <td>
                        <button className="btn btn-primary" onClick={() => handleGraficos(report)}>
                        <FontAwesomeIcon icon={faChartSimple} style={{ color: 'black' }} />
                        </button>
                        </td>
                        <td>
                          <button className="btn btn-primary" onClick={() => handleEliminar(report)}>
                          <FontAwesomeIcon icon={faTrash}   style={{ color: 'black' }} />
                            </button>
                          </td>
                      
                    </tr>
                  ))
                }
              

            
            </tbody>
          </table>
        </div>
       
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