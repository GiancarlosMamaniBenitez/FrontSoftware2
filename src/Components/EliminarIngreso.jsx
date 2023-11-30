import React, { useState, useEffect } from 'react';
import TotalIncomesNew from './TotalIncomesNew';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import IngresosApi from "@/app/api_fronted/ingresos.js"
import Toast from 'react-bootstrap/Toast';

import Pagination from 'react-bootstrap/Pagination';
const EliminarIngreso = ({ ListaIngresos ,selectedCardId, totalIncomeAmount, listCategorias, handleDelete, handleSave, handleEdit, isEditing}) => {
    
    let fechaArray = []; // Declarar fechaArray fuera del bloque if
    let idArray = []; // Declarar idArray
    let ingresoFiltrado = [];
    let oriArray = [];
    let origenArray = [];
    const sinFiltro = "Sin filtro"
    const [ingresos, setFilteredIncomes] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCatName, setSelectedCatName] = useState('');
    const [selectedAmount, setSelectedAmount] = useState('');
    const [difference, setDifference] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    
    const [montos,setMontos]= useState(0);
    const [editingRows, setEditingRows] = useState({});

    const [currentPage, setCurrentPage] = useState(1); // Nuevo estado para la página actual
  const itemsPerPage = 3; // Número de elementos por página
  const [showNotification, setShowNotification] = useState(false);
   
    if(selectedCardId){
       
        const ingresosAplanados = ListaIngresos.flat();
        console.log(ingresosAplanados)
        const catAplanados = listCategorias.flat();
        

        idArray = Array.from(new Set(ingresosAplanados.map(ingreso=> ingreso.id_tarjeta || " ")));
      

        fechaArray = Array.from(new Set(ingresosAplanados.filter(ingreso => ingreso.id_tarjeta === selectedCardId).map(ingreso => (ingreso.fecha_ingresos || " ")  )));
        
        
        oriArray = Array.from(new Set(ingresosAplanados.filter(ingreso => ingreso.id_tarjeta === selectedCardId ).map(ingreso => ingreso.id_origen || " ")));

        const valorCategoria = selectedCategory;

        //categoriaArray = Array.from(new Set(catAplanados.map(cat => cat.nombre)));
        origenArray = Array.from(
            new Set(
              catAplanados
                .filter(cat => ingresosAplanados.some(ingreso => ingreso.id_tarjeta === selectedCardId && ingreso.id_origen ===cat.id))
                .map(cat => ({ nombre: cat.nombre, id: cat.id }))
            )
          );
   
        if(selectedDate == sinFiltro){
            ingresoFiltrado = Array.from(new Set(ingresosAplanados.filter(ingreso => ((ingreso.id_tarjeta === selectedCardId) || (ingreso.id_origen===selectedCategory)))));
        }else{
            ingresoFiltrado = Array.from(new Set(ingresosAplanados.filter(ingreso => ((ingreso.id_tarjeta === selectedCardId) && (ingreso.fecha_ingresos === selectedDate) || (ingreso.id_origen===selectedCategory)))));
        }
    
    }

    useEffect(() => {
        // Update filteredIncomes when ingresoFiltrado changes
       console.log(ListaIngresos)
       
    }, []);


    
    useEffect(() => {
        const intervalId = setInterval(() => {
          setShowNotification(true);
        }, 5000);
    
        // Limpiar el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
      }, []);
    
      const handleNotificationClose = () => {
        setShowNotification(false);
      };
    return(
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
            <h2>Ingresos en Array</h2>
            <label htmlFor="selectFecha">Selecciona una fecha:</label>
            <select
                    id="selectFecha"
                    onChange={(e) => {
                    // Actualizar la fecha seleccionada cuando cambia el valor del select
                    setSelectedDate(e.target.value);
                    }}
                    value={selectedDate} // Establecer el valor actual del estado para que el select refleje el estado
                >
                <option>{sinFiltro}</option>
                    {fechaArray.map((fecha, index) => (
                    <option key={index} value={fecha}>
                        {fecha}
                    </option>
                    ))}
            </select>
            

            {/* Mostrar los ingresos filtrados en una tabla */}
            <table className='table'>
                <thead>
                <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Monto</th>
                    <th scope='col'>Fecha ingresos</th>
                    <th scope='col'>Categoria</th>
                    <th scope='col'>Opciones</th>
                    {/* ... Otros encabezados de columna */}
                </tr>

                </thead>
                <tbody>
                    {ingresoFiltrado
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((ingreso) => (
                        <tr key={ingreso.id_ingresos}>
                            <th scope='row'>{ingreso.id_ingresos}</th>
                            <td>
                                <fieldset>
                                    {
                                    //isEditing
                                    isEditing ? (
                                        <div>
                                            <input
                                                
                                                type="text"
                                                placeholder="Editable input"
                                                value={
                                                    montos}
                                                onChange={(e) => {
                                                    console.log("Nuevo valor de monto:", e.target.value);
                                                    //setMonto(e.target.value);
                                                    
                                                    /*setDifference(
                                                        totalIncomeAmount - calculateTotalSelectedAmount(selectedItems)
                                                    );*/
                                                    setMontos(e.target.value);
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            
                                            <span>
                                                {ingreso.monto}
                                            </span>
                                        </div>
                                    )}
                                </fieldset>

                            </td>
                            <td>{ingreso.fecha_ingresos}</td>
                            <td >{origenArray.find(ori => (ori.id === ingreso.id_origen)).nombre}</td>
                            <td>
                            {
                            //isEditing
                            isEditing ? (
                                <Button className="mx-2" onClick={() => handleSave(ingreso.id_ingresos, montos)}>Guardar</Button>
                            ) : (
                                <Button className="mx-2" onClick={() => handleEdit()}>Editar</Button>
                                
                            )}
  
                                <Button
                                    className='mx-2 btn-danger'
                                    onClick={() => {handleDelete(ingreso.id_ingresos)
                                                    
                                    }}
                                    
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))
                    
                    }
                   
                </tbody>
                
            </table>

            <div>
                <Pagination>
                    {[...Array(Math.ceil(ingresoFiltrado.length / itemsPerPage)).keys()].map((number) => (
                    <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>
                        {number + 1}
                    </Pagination.Item>
                    ))}
                </Pagination>
            </div>
            <div>
            <Toast show={showNotification} onClose={handleNotificationClose}>
        <Toast.Header>
          <strong className="me-auto">Recordatorio</strong>
          <small>Justo ahora</small>
        </Toast.Header>
        <Toast.Body>No olvides actualizar tus ingresos.</Toast.Body>
      </Toast>
            </div>
            
        </div>
    );
  };
  
  export default EliminarIngreso;