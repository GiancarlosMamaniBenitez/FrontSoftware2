// VerGraficos.js
'use client'
import { usePDF } from 'react-to-pdf';

import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import NavBar from "@/Components/NavBar";
import Chart from "@/Components/Chart";
import ReportesApi from "@/app/api_fronted/reportes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TarjetasApi from "../api_fronted/tarjetas";
import IngresosApi from "../api_fronted/ingresos";
import GastosApi from "../api_fronted/gastos";
import UsuariosApi from "../api_fronted/usuarios";
import CategoriasApi from "../api_fronted/categorias";
import MetaApi from "../api_fronted/meta";
import LimitgastoApi from "../api_fronted/Limitgasto";
import "./graficos.css";
import OrigenApi from "../api_fronted/origen";
import Chart1 from "@/Components/Chart1";
import { faCircleDown, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import Bars from "@/Components/BarChart";
const VerGraficos = () => {
    const [mostrarGrafico, setMostrarGrafico] = useState(false);
    const [ gastoscompletos, setGastoscompletos] = useState([])
    const[gastosCat,setGastosCat] = useState([])
    const [listcards, setListCards] = useState([]);
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });

    const [listUsuarios, setListUsuarios] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sesion, setSesion] = useState({});
  const [meta, setlistMeta] = useState([]);
  const [ahorro, setAhorro] = useState();
  const [ingresos, setIngresos] = useState();
  const [gastos, setGastos] = useState();
  const [fecha, setFecha] = useState("");
  const [categorias, setCategorias] = useState();
  const [tarjeta, setTarjeta] = useState();
  const [tipo, setTipo] = useState();
  const [reporte, setReporte] = useState();
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const idParam = urlParams.get("id")
  const[listLimit, setListLimit] = useState([]);
  const[listCategorias, setListCategorias] = useState([]);
  const [ listReport , setListReport ] = useState([])
  const [ListaIngresos,setListaIngresos] = useState([]);
  const [listGastos, setListGastos] = useState([]);
  const [listOrigen, setListOrigen] = useState([])
  const [origen, setOrigen] = useState([])
  const [ingresoOrigen, setIngresoOri]= ([])
  const [ingresocompletos, setIngresocompletos] = useState([])
  const verificarSesion = () => {
    let sesionGuardada = localStorage.getItem("sesion");
    if (sesionGuardada == undefined) {
      alert("No hay sesión guardada");
      router.push('/Login');
    } else {
      setSesion(JSON.parse(sesionGuardada));
    }
  };
 
  const LoadData = async () => {
    try {
      const [result, result1, result2, result3, result5, result6, result7, result8, result9] = await Promise.all([
        TarjetasApi.findAll(),
        IngresosApi.findAll(),
        GastosApi.findAll(),
        UsuariosApi.findAll(),
        CategoriasApi.findAll(),
        MetaApi.findAll(),
        LimitgastoApi.findAll(),
        ReportesApi.findAll(),
        OrigenApi.findAll()
      ]);

      setListCards(result.data);
      setListaIngresos(result1.data);
      setListGastos(result2.data);
      setListUsuarios(result3.data);
      setListCategorias(result5.data);
      setlistMeta(result6.data);
      setListLimit(result7.data);
      setListReport(result8.data);
      setListOrigen(result9.data)
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  }; const recogerReporteID = async () => {
    try {
      const result = await ReportesApi.findOne(idParam);
      setReporte(result.data);
      setGastos(result.data.totalGastos);
      setIngresos(result.data.totalIngresos);
      setAhorro(result.data.ahorro);
      setFecha(result.data.fecha_reportes);
      setCategorias(result.data.id_categoria);
      setTarjeta(result.data.id_tarjeta);
      setTipo(result.data.tipo);
      setOrigen(result.data.id_origen)
    } catch (error) {
      console.error("Error al recoger reporte:", error);
    }
  };
 
  const total = [ingresos, gastos];

  // Supongamos que gastoscompletos tiene la siguiente forma: { Ropa: 731, Comida: 100, Salidas: 1000 }
 
  
  // Combina los datos de total y gastoscompletos
  const resultado = total.reduce((acumulador, categoria, index) => {
    const nombreCategoria = index === 0 ? 'Ingresos' : 'Gastos'; // Asigna un nombre a la categoría
  
    // Convierte el valor a número y añade la categoría con su monto correspondiente al nuevo objeto
    acumulador[nombreCategoria] = parseFloat(categoria);
    return acumulador;
  }, {});
  
  // resultado contendrá algo como { Ingresos: 500, Gastos: 300 }
  console.log(resultado);
 

  const gastosporcat = async () => {
    console.log(listGastos)
   
    try {
      const result = await ReportesApi.findOne(idParam);
      const reporte = result.data;
      const fechaYearMonth = fecha.substring(0, 7);
      const gastosusuario = tipo === "daily"
        ? listGastos.filter((e) => e.id_tarjeta === tarjeta && e.fecha_gastos === fecha)
        : listGastos.filter((e) => e.id_tarjeta === tarjeta && e.fecha_gastos.startsWith(fechaYearMonth));
  
      const gastosusuarioFiltrados = categorias !== 0
        ? gastosusuario.filter((gasto) => gasto.id_categoria == categorias)
        : gastosusuario;
  

  
      const totalMontoGastosCat = gastosusuarioFiltrados.reduce((total, gasto) => total + parseFloat(gasto.monto));
      console.log("Total de gastos por categoría:", gastosusuarioFiltrados);
      const gastosSumados = gastosusuarioFiltrados.reduce((acumulador, gasto) => {
        const idCategoria = gasto.id_categoria;
        const nombrecat = listCategorias.find((e) => e.id === idCategoria)?.nombre || 'Sin Categoría';
        acumulador[nombrecat] = (acumulador[nombrecat] || 0) + parseFloat(gasto.monto);
        return acumulador;
      }, {});
      console.log(gastosSumados)
       setGastoscompletos(gastosSumados)
       
      // Hacer algo con gastosPorCategoria si es necesario
    } catch (error) {
      console.error("Error al procesar gastos por categoría:", error);
    }
    setMostrarGrafico(true);
  };
  const ingresosporcat = async () => {
    console.log(ListaIngresos)
   
    try {
      const result = await ReportesApi.findOne(idParam);
      const reporte = result.data;
      const fechaYearMonth = fecha.substring(0, 7);
      const ingresosusuario = tipo === "daily"
        ? ListaIngresos.filter((e) => e.id_tarjeta === tarjeta && e.fecha_ingresos === fecha)
        : ListaIngresos.filter((e) => e.id_tarjeta === tarjeta && e.fecha_ingresos.startsWith(fechaYearMonth));
  
      const ingresosusuarioFiltrados = origen !== 0
        ? ingresosusuario.filter((origen) => origen.id_origen == origen)
        : ingresosusuario;
  
        
      const totalMontoIngresosOrigen = ingresosusuarioFiltrados.reduce((total, ingreso) => total + parseFloat(ingreso.monto));
      console.log("Total de ingreso por categoría:", ingresosusuarioFiltrados);
      const ingresosSumados = ingresosusuarioFiltrados.reduce((acumulador, ingreso) => {
        const idOrigen = ingreso.id_origen;
        const nombreOrigen = listOrigen.find((e) => e.id === idOrigen)?.nombre || 'Sin Categoría';
        acumulador[nombreOrigen] = (acumulador[nombreOrigen] || 0) + parseFloat(ingreso.monto);
        return acumulador;
      }, {});
      console.log(ingresosSumados)
       setIngresocompletos(ingresosSumados)
       
      // Hacer algo con gastosPorCategoria si es necesario
    } catch (error) {
      console.error("Error al procesar ingresos por categoría:", error);
    }
    setMostrarGrafico(true);
  };


  useEffect(() => {
    const fetchData = async () => {
       verificarSesion();
      recogerReporteID();
      LoadData();
       
    };
   
    fetchData();
  }, [])

  const gastosPorDia = () => {
    // Lógica para obtener datos de gastos por día
    const fechaYearMonth = fecha.substring(0, 7);
    const gastosSemanales = listGastos.filter(
      (gasto) => gasto.id_tarjeta === tarjeta && gasto.fecha_gastos.startsWith(fechaYearMonth)
    );

    // Agrupa los gastos por día
    const gastosPorDia = gastosSemanales.reduce((acumulador, gasto) => {
        const fechaCompleta = gasto.fecha_gastos;
      acumulador[fechaCompleta] = (acumulador[fechaCompleta] || 0) + parseFloat(gasto.monto);
      return acumulador;
    }, {});

    return gastosPorDia;
  };

  const ahorroPorDia = () => {
    const fechaYearMonth = fecha.substring(0, 7);
  const ingresosSemanales = ListaIngresos.filter(
    (ingreso) => ingreso.id_tarjeta === tarjeta && ingreso.fecha_ingresos.startsWith(fechaYearMonth)
  );

  const diasDeLaSemana = [...new Set(ingresosSemanales.map((ingreso) => ingreso.fecha_ingresos))];

  const ahorroPorDia = diasDeLaSemana.reduce((acumulador, dia) => {
    const ingresosDia = ingresosSemanales.filter((ingreso) => ingreso.fecha_ingresos === dia);
    const totalIngresosDia = ingresosDia.reduce((total, ingreso) => total + parseFloat(ingreso.monto), 0);

    // Asumiendo que también tienes el total de gastos por día
    const totalGastosDia = gastosPorDia[dia] || 0;

    acumulador[dia] = totalIngresosDia - totalGastosDia;

    return acumulador;
  }, {});

  return ahorroPorDia;
};

  const ingresosPorDia = () => {
    // Lógica para obtener datos de ingresos por día
    const fechaYearMonth = fecha.substring(0, 7);
    const ingresosSemanales = ListaIngresos.filter(
      (ingreso) => ingreso.id_tarjeta === tarjeta && ingreso.fecha_ingresos.startsWith(fechaYearMonth)
    );

    // Agrupa los ingresos por día
    const ingresosPorDia = ingresosSemanales.reduce((acumulador, ingreso) => {
        const fechaCompleta = ingreso.fecha_ingresos;
      acumulador[fechaCompleta] = (acumulador[fechaCompleta] || 0) + parseFloat(ingreso.monto);
      return acumulador;
    }, {});

    return ingresosPorDia;
  };

  const Presion = async () => {
    // Lógica existente
    ingresosporcat();
    gastosporcat();

    // Lógica adicional para gráficos semanales
    if (tipo === "Monthly") {
      const gastosPorDiaData = gastosPorDia();
      const ahorroPorDiaData = ahorroPorDia();
      const ingresosPorDiaData = ingresosPorDia();

      // Mostrar los gráficos semanales
      setMostrarGrafico(true);
      // ... (puedes manejar los datos según tus necesidades)
    }
  };
  console.log(tipo)
  return (
    <div ref={targetRef}>
    <div className="text-center">
      <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion} />
      <div className={`reports-container${isSidebarOpen ? '-shifted' : ''} mx-auto`}>
        <h1 className="tituloReporte">Reporte Gráfico</h1>
        <br />
        <div className="flex">
                <div className="additional-container">
                    <h1>Comparativa de Ingresos y Gastos</h1>
                    {mostrarGrafico && <Chart1 Ingresos={ingresos} Gastos={gastos} />}

                </div>

                <div className="additional-container">
                    <h1>Gastos por Categoria</h1>
                    <Chart data={gastoscompletos} />
                </div>
               
                <div className="additional-container">
                    <h1>Ingresos por Categoria</h1>
                    <Chart data={ingresocompletos} />
                </div>
                </div>
                <div className="flex">
                {tipo == "Monthly" &&  (
          <>
          <div className="additional-container">
         
          {mostrarGrafico &&<Bars data={gastosPorDia()} title="Gastos por Día" xLabel="Fecha" yLabel="Monto" />}
      </div>
      <div className="additional-container">
         
      {mostrarGrafico &&<Bars data={ahorroPorDia()} title="Ahorro por Día" xLabel="Fecha" yLabel="Monto" />}
     </div>
     <div className="additional-container">
         
     {mostrarGrafico &&<Bars data={ingresosPorDia()} title="Ingresos por Día" xLabel="Fecha" yLabel="Monto" />}
     </div>
      
            
            
           
          </>
        )}


        
                </div>
                <div className='flex1'>
                    
                <button className ="button-report" onClick={Presion}>Generar Reporte</button>
                <button  className ="button-report" onClick={toPDF}>Descargar</button>

                </div>



      </div>
    </div>
    </div>
  );
};

export default VerGraficos;
