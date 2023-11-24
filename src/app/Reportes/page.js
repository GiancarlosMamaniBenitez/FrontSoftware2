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

import ReportesApi from "../api_fronted/reportes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircleDown, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";
const Reports = () => {
  const [ nombreCat, setNombreCat] = useState("")
  const [gastosPorCategoria, setGastosPorCategoria] = useState([]);
  const[totalGastos1,setTotalGastos1] =useState()
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedCard2, setSelectedCard2] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [userCards, setUserCards] = useState("");
  const [selectedReportType, setSelectedReportType] = useState("daily");
  const [selectedReportInform, setSelectedReportInform] = useState("general");
  const [selectedReportCategory, setSelectedReportCategory] = useState("");
  const [reportData, setReportData] = useState(null)  ;

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
  const generateReport = async () => {
    
        const currentDate = getCurrentDate();
        const currentMonth = currentDate.slice(0, 7);

        const selectedCardData = listcards.find((card) => card.number === selectedCard2);
        console.log(selectedCardData)
        const category = selectedReportCategory;
        
        const tarjeta = listcards.find((e) => e.id == selectedCardData.id);
      let reportestarjeta = []
      reportestarjeta = listReport.filter((e) => e.id_tarjeta == tarjeta.id);
        setUserReport(reportestarjeta)
        setUsuarioRepo(reportestarjeta)

    //Reporte general o detallado
      const informeusuario = selectedReportInform === "general"
      
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
        const gastosusuarioFiltrados = selectedReportCategory
          ? gastosusuario.filter((gasto) => gasto.id_categoria == selectedReportCategory)
          : gastosusuario;
      console.log(gastosusuarioFiltrados)
      const totalMontoGastosCat = gastosusuarioFiltrados.reduce((total, gasto) => {
        return total + parseFloat(gasto.monto);
      }, 0);
      setGastosPorCategoria(gastosusuarioFiltrados);

      
      console.log("Total de gastos por categoría:", totalMontoGastosCat);
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
        let report; // Declarar la variable para contener el objeto report


 
    report = {
      id_reportes: reportesId,
      tipo: selectedReportType === 'daily' ? "Daily" : "Monthly",
      informe: selectedReportInform === "general" ? "General" : "Detallado",
      fecha_reportes: selectedReportType === "daily" ? currentDate : currentMonth,
      id_tarjeta: tarjeta.id,
      id_categoria: catId || 0, // Usa null si no hay categoría seleccionada
      totalGastos: totalMontoGastosCat,
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
            setUsuarioRepo([...usuarioRepo, response.data]);
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

  
  
    const pdfDoc = new jsPDF();

    const addContentToPage = (content, yOffset, maxY) => {
      if (yOffset > maxY) {
        pdfDoc.addPage();
        yOffset = 15; // Ajusta el valor según sea necesario para el espacio del encabezado en la nueva página.
      }
    
      pdfDoc.text(content, 10, yOffset);
      return yOffset + 10; // Incrementa según sea necesario para el espacio entre líneas.
    };
    
    // Título y Estilo
    let yOffset = 15;
    yOffset = addContentToPage("Reporte Financiero", yOffset, 200);
    
    // Contenido del Informe
    yOffset = addContentToPage(`Tipo de Informe: ${report.tipo == 'daily' ? 'Diario' : 'Mensual'}`, yOffset, 200);
    yOffset = addContentToPage(`Fecha del Informe: ${report.fecha_reportes}`, yOffset, 200);
    yOffset = addContentToPage(`Nombre de la Tarjeta: ${selectedCard2 ? selectedCard2 : 'Sin Tarjeta'}`, yOffset, 200);
   
    if (selectedReportInform === "general") {
      yOffset = addContentToPage(`Total de Gastos: $${report.totalGastos}`, yOffset, 200);
    } else {
      // Gastos por categoría
      if (gastosPorCategoria.length > 0) {
        yOffset = addContentToPage("Gastos por Categoría:", yOffset, 200);
    
        // Sumar montos de gastos con el mismo ID
        const gastosSumados = gastosPorCategoria.reduce((acumulador, gasto) => {
          const idCategoria = gasto.id_categoria;
          const nombrecat = listCategorias.find((e) => e.id === idCategoria)?.nombre || 'Sin Categoría';
          acumulador[nombrecat] = (acumulador[nombrecat] || 0) + parseFloat(gasto.monto);
          return acumulador;
        }, {});
        
        for (const [nombreCat, monto] of Object.entries(gastosSumados)) {
          yOffset = addContentToPage(`Categoría: ${nombreCat} - Monto Total: $${monto.toFixed(2)}`, yOffset, 200);
        }
        
      }
    
      // Resto de la información
      yOffset = addContentToPage(`Total de Ingresos: $${report.totalIngresos}`, yOffset, 200);
      yOffset = addContentToPage(`Ahorro: $${report.ahorro}`, yOffset, 200);
    }
    
    // Pie de Página
    addContentToPage("¡Gracias por utilizar nuestro servicio de reportes financieros!", yOffset, 200);
    
    // Guardar el PDF
    pdfDoc.save(`Informe_${report.id_reportes}.pdf`);
  }    
    
  

  return (
    <div className="text-center"> {/* Agregado para centrar todo */}
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
        <button className="button-report" onClick={() => handleBuscarRepo()} disabled={refreshing}>
          Buscar Reporte
          {refreshing && <FontAwesomeIcon icon={faSyncAlt} spin style={{ marginLeft: '5px' }} />}
        </button>
        <button className ="button-report" onClick={generateReport}>Generar Reporte</button>
        <button className ="button-report" >Categorizar los gastos</button>

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
