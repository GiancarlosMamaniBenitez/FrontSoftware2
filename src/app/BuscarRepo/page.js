'use client'
import '@/app/BuscarRepo/buscar.css'
import jsPDF from "jspdf";
import React, { useState, useEffect, use } from "react";
import NavBar from "@/Components/NavBar";
import ReportesApi from "../api_fronted/reportes";
import TablaRepo from "@/Components/TablaRepo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import TarjetasApi from "../api_fronted/tarjetas";
import GastosApi from "../api_fronted/gastos";
import IngresosApi from "../api_fronted/ingresos";
import UsuariosApi from "../api_fronted/usuarios";
import CategoriasApi from "../api_fronted/categorias";
import MetaApi from "../api_fronted/meta";
import LimitgastoApi from "../api_fronted/Limitgasto";
import { useRouter } from "next/navigation";
import CardSelect from "@/Components/CardSelect";
import SelectReport from "@/Components/SelectReport";
const BuscarRepo = () => {
  const [searchDate, setSearchDate] = useState(getCurrentDate());
  const [usuarioRepo, setUsuarioRepo] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [reportscard ,setReportscard] = useState([])
const [sesion , setSesion ] = useState("")
const [selectedCard, setSelectedCard] = useState("");
const [selectedCard2, setSelectedCard2] = useState("");

  const [userCards, setUserCards] = useState("");
  const [selectedReportType, setSelectedReportType] = useState("daily");
  const [selectedReportInform, setSelectedReportInform] = useState("general");
  const [selectedReportCategory, setSelectedReportCategory] = useState("");
  const [reportData, setReportData] = useState(null)  ;
const [ reportesFiltrado, setReportesFiltrado] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categorias, setCategorias] = useState([])
  const [listcards, setListCards] = useState([]);
  const [selectedDate, setSelectedDate] = useState("")
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
  const handleSelectedDateChange = (event) => {  
    const selectedDate = event.target.value;
    if(selectedCard){
    if (selectedDate){
      setSelectedDate(selectedDate)
      
    let tarjetausuario = listcards.filter((e) => e.id_usuario == sesion.id)
    const tarjeta = tarjetausuario.find((e) => e.number == selectedCard.number);
    let reportestarjeta = listReport.filter((e) => e.id_tarjeta == tarjeta.id)
    setReportscard(reportestarjeta);
    
    console.log(selectedDate)
    setUsuarioRepo(reportestarjeta)
    let reportesFiltrados = usuarioRepo.filter((e) => e.fecha_reportes == selectedDate);

    setReportesFiltrado(reportesFiltrados)
    }
    else{
      setSelectedDate(null)
    }
    
  }else {
    setUsuarioRepo(null)
  }
  

};

    
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
   const handleBuscarRepo = async () => {
    

  }

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
    pdfDoc.text(`Nombre de la Tarjeta: ${selectedCard2 ? selectedCard2 : 'Sin Tarjeta'}`, 10, 60);

    // Obtener el nombre de la categoría
  
   
    const categoria = report.id_categoria
    const categorias= listCategorias.find((e) => e.id == categoria);
    console.log(categorias)
    pdfDoc.text(`Categoría: ${categorias ? categorias.nombre : 'Sin Categoría'}`, 10, 75);
    
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
    <div className="text-center">
       <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion}/>
      <div className="reports-container mx-auto">
        <h1 className="tituloReporte">Buscar Reportes</h1>
        <div className="card mx-auto">
          <label className="subtituloReporte">Tarjeta:</label>
          <CardSelect
            selectedCard={selectedCard2}
            userCards={listcards.filter((e) => e.id_usuario == sesion.id)}
            handleSelectedCardChange={handleSelectedCardChange}
          />
        
        </div>
        <SelectReport 
        selectedDate ={selectedDate} 
        reportscard ={usuarioRepo} 
        selectedCard={selectedCard}
        handleSelectedDateChange = {handleSelectedDateChange}  />
        {/* Controles de búsqueda */}
        
        {selectedCard && selectedDate &&
        <TablaRepo usuarioRepo={reportesFiltrado} generateReportPDF={generateReportPDF} />
      }
        </div>
    </div>
  );
};

// Función para obtener la fecha actual en formato "YYYY-MM-DD"
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default BuscarRepo;
