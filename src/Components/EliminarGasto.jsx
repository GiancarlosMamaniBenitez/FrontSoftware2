import React, { useState, useEffect  } from 'react';
import TotalExpensesNew from './TotalExpensesNew';
import Form from 'react-bootstrap/Form';
import 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import GastosApi from '@/app/api_fronted/gastos';
const EliminarGasto = ({ListaGastos,selectedCardId,listcards,listCategorias,totalExpenseAmount }) => {
    let fechaArray = []; // Declarar fechaArray fuera del bloque if
    let idArray = []; // Declarar idArray
    let gastoFiltrado = [];
    let catArray = [];
    let categoriaArray = [];
    const sinFiltro = "Sin filtro"
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCatName, setSelectedCatName] = useState('');
    const [selectedAmount, setSelectedAmount] = useState('');
    const [difference, setDifference] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [montos,setMontos]= useState({});
    const [editingRows, setEditingRows] = useState({});
   
    if(selectedCardId){
        console.log("lista categorias",listCategorias);
        console.log("lista gastos",ListaGastos);
        const gastosAplanados = ListaGastos.flat();
        console.log("fechas ingresos",gastosAplanados);
        const catAplanados = listCategorias.flat();
        console.log("cat:",catAplanados);

        idArray = Array.from(new Set(gastosAplanados.map(gasto=> gasto.id_tarjeta || " ")));
        console.log("idArray gastos",idArray);

        fechaArray = Array.from(new Set(gastosAplanados.filter(gasto => gasto.id_tarjeta === selectedCardId).map(gasto => (gasto.fecha_gastos || " ")  )));
        console.log("fechaArray gasto:",fechaArray);
        
        catArray = Array.from(new Set(gastosAplanados.filter(gasto => gasto.id_tarjeta === selectedCardId ).map(gasto => gasto.id_categoria || " ")));
        console.log("catArray",catArray);

        console.log("selected date",selectedDate);
        console.log("selected category",selectedCategory);
        
        const valorCategoria = selectedCategory;
        console.log("selectedcardid",selectedCardId);
        //categoriaArray = Array.from(new Set(catAplanados.map(cat => cat.nombre)));
        categoriaArray = Array.from(
            new Set(
              catAplanados
                .filter(cat => gastosAplanados.some(gasto => gasto.id_tarjeta === selectedCardId && gasto.id_categoria ===cat.id))
                .map(cat => ({ nombre: cat.nombre, id: cat.id }))
            )
          );
        console.log("categoria nombres array",categoriaArray);
        if(selectedDate == sinFiltro){
            gastoFiltrado = Array.from(new Set(gastosAplanados.filter(gasto => ((gasto.id_tarjeta === selectedCardId) || (gasto.id_categoria===selectedCategory)))));
        }else{
            gastoFiltrado = Array.from(new Set(gastosAplanados.filter(gasto => ((gasto.id_tarjeta === selectedCardId) && (gasto.fecha_gastos === selectedDate) || (gasto.id_categoria===selectedCategory)))));
        }
       
        console.log("gasto filtrados",gastoFiltrado);

        console.log("select name category",selectedCatName);

        
        console.log("gasto monto seleccionado", selectedAmount);
        console.log("totalexpenseamount",totalExpenseAmount);

        
        
        
    }

    const handleEdit = (ingresoId) => {
        //setIsEditing(true);
        setEditingRows((prevEditingRows) => ({
            ...prevEditingRows,
            [ingresoId]: true,
          }));
      };
    const handleSave = async (ingresoId) => {
        //setIsEditing(false);
        setEditingRows((prevEditingRows) => ({
            ...prevEditingRows,
            [ingresoId]: false,
          }));
        
          // Elimina la clave asociada al id_ingresos del estado montos
        // Actualiza el estado montos con el nuevo valor del monto
        setMontos((prevMontos) => ({
            ...prevMontos,
            [ingresoId]: prevMontos[ingresoId] !== undefined ? prevMontos[ingresoId] : gasto.monto,
        }));

        try {
            // Aquí deberías llamar a tu API para actualizar el monto en la base de datos
            // Puedes usar fetch o axios, por ejemplo
            const response = await GastosApi.update(ingresoId, { monto: montos[ingresoId] })
            handleOnLoadAct();

            if (response && response.status === 200) {
                // Registro exitoso, redirige a la página de inicio de sesión
                alert('Actualización exitosa!');
                handleOnLoadAct();
            } else {
                // Manejo de errores en caso de que algo salga mal en el backend
                alert('Error al actualizar usuario');
            }
        } catch (error) {
           }

    };

    const handleDelete = async (ingresoId) => {
        // Realiza la eliminación del ingreso en la base de datos
        try {
            const response = await GastosApi.remove(ingresoId);
            console.log('Response:', response);
            if (response && response.status === 200) {
                // Eliminación exitosa
                alert('Eliminación exitosa');
                handleOnLoadAct();
            } else {
                // Manejo de errores en caso de que algo salga mal en el backend
                alert('Error al eliminar ingreso');
            }
        } catch (error) {
            console.error('Error en la solicitud de eliminación:', error);
        }
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
                    {gastoFiltrado.map((gasto) => (
                        <tr key={gasto.id_gastos}>
                            <th scope='row'>{gasto.id_gastos}</th>
                            <td>
                                <fieldset>
                                    {
                                    //isEditing
                                    editingRows[gasto.id_gastos]  ? (
                                        <div>
                                            <input
                                                id={`disabledMontoInput_${gasto.id_gastos}`}
                                                type="text"
                                                placeholder="Editable input"
                                                value={
                                                    //ingreso.monto
                                                    //monto
                                                /* montos[ingreso.id_ingresos] !== undefined
                                                    ? montos[ingreso.id_ingresos]
                                                    : ingreso.monto*/
                                                    montos[gasto.id_gastos] || gasto.monto

                                                    
                                                }
                                                onChange={(e) => {
                                                    console.log("Nuevo valor de monto:", e.target.value);
                                                    //setMonto(e.target.value);
                                                    
                                                    /*setDifference(
                                                        totalIncomeAmount - calculateTotalSelectedAmount(selectedItems)
                                                    );*/
                                                    setMontos({
                                                        ...montos,
                                                        [gasto.id_gastos]: e.target.value,
                                                    });
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
                            editingRows[gasto.id_gastos] ? (
                                <Button className="mx-2" onClick={() => handleSave(gasto.id_gastos)}>Guardar</Button>
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

            
        </div>
    );
  
    
};
  
export default EliminarGasto;