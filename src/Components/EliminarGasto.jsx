import React, { useState, useEffect  } from 'react';
import TotalExpensesNew from './TotalExpensesNew';
import Form from 'react-bootstrap/Form';
import 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import GastosApi from '@/app/api_fronted/gastos';
import Toast from 'react-bootstrap/Toast';
import Pagination from 'react-bootstrap/Pagination';
const EliminarGasto =  ({ listaGastos,selectedCardId, listcards, listCategorias, totalExpenseAmount, updateListGastos, handleDelete, handleSave, handleEdit, isEditing })  => {
    let fechaArray = []; // Declarar fechaArray fuera del bloque if
    let idArray = []; // Declarar idArray
    let gastoFiltrado = [];
    let catArray = [];
    let categoriaArray = [];
    const sinFiltro = "Sin filtro"
    const [listGastos1, setListGastos1] = useState([])
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
 const [listGastos,setListGastos] = useState([listaGastos])
 


    if(selectedCardId){
        const gastosAplanados = listaGastos.flat();
       
        const catAplanados = listCategorias.flat();
 
        idArray = Array.from(new Set(gastosAplanados.map(gasto=> gasto.id_tarjeta || " ")));

        fechaArray = Array.from(new Set(gastosAplanados.filter(gasto => gasto.id_tarjeta === selectedCardId).map(gasto => (gasto.fecha_gastos || " ")  )));
    
        catArray = Array.from(new Set(gastosAplanados.filter(gasto => gasto.id_tarjeta === selectedCardId ).map(gasto => gasto.id_categoria || " ")));
      
        
        const valorCategoria = selectedCategory;
    
        //categoriaArray = Array.from(new Set(catAplanados.map(cat => cat.nombre)));
        categoriaArray = Array.from(
            new Set(
              catAplanados
                .filter(cat => gastosAplanados.some(gasto => gasto.id_tarjeta === selectedCardId && gasto.id_categoria ===cat.id))
                .map(cat => ({ nombre: cat.nombre, id: cat.id }))
            )
          );
        if(selectedDate == sinFiltro){
            gastoFiltrado = Array.from(new Set(gastosAplanados.filter(gasto => ((gasto.id_tarjeta === selectedCardId) || (gasto.id_categoria===selectedCategory)))));
        }else{
            gastoFiltrado = Array.from(new Set(gastosAplanados.filter(gasto => ((gasto.id_tarjeta === selectedCardId) && (gasto.fecha_gastos === selectedDate) || (gasto.id_categoria===selectedCategory)))));
        }
        
    }

    
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
            <h2>Gastos en Array</h2>
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
                    <th scope='col'>Fecha Gastos</th>
                    <th scope='col'>Categoria</th>
                    <th scope='col'>Opciones</th>
                    {/* ... Otros encabezados de columna */}
                </tr>

                </thead>
                <tbody>
                    {gastoFiltrado
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((gasto) => (
                        <tr key={gasto.id_gastos}>
                            <th scope='row'>{gasto.id_gastos}</th>
                            <td>
                                <fieldset>
                                    {
                                    //isEditing
                                    isEditing[gasto.id_gastos] ? (
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
                                                {gasto.monto}
                                            </span>
                                        </div>
                                    )}
                                </fieldset>

                            </td>
                            <td>{gasto.fecha_gastos}</td>
                            <td >{categoriaArray.find(cat => (cat.id === gasto.id_categoria)).nombre}</td>
                            <td>
                            {
                            //isEditing
                            isEditing[gasto.id_gastos] ? (
                                <Button className="mx-2" onClick={() => handleSave(gasto.id_gastos,montos)}>Guardar</Button>
                            ) : (
                                <Button className="mx-2" onClick={() => handleEdit(gasto.id_gastos)}>Editar</Button>
                                
                            )}
  
                                <Button
                                    className='mx-2 btn-danger'
                                    onClick={() => handleDelete(gasto.id_gastos)}
                                    
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
                    {[...Array(Math.ceil(gastoFiltrado.length / itemsPerPage)).keys()].map((number) => (
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
  
export default EliminarGasto;