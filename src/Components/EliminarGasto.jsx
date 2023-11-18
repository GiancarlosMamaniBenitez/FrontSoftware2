import React, { useState, useEffect  } from 'react';
import TotalExpensesNew from './TotalExpensesNew';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import GastosApi from '@/app/api_fronted/gastos';
const EliminarGasto = ({ListaGastos,selectedCardId,listcards,listCategorias,totalExpenseAmount }) => {
    let fechaArray = []; // Declarar fechaArray fuera del bloque if
    let idArray = []; // Declarar idArray
    let gastoFiltrado = [];
    let catArray = [];
    let categoriaArray = [];
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

        gastoFiltrado = Array.from(new Set(gastosAplanados.filter(gasto => ((gasto.id_tarjeta === selectedCardId) && (gasto.fecha_gastos === selectedDate) || (gasto.id_categoria===selectedCategory)))));
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
                    {fechaArray.map((fecha, index) => (
                    <option key={index} value={fecha}>
                        {fecha}
                    </option>
                    ))}
            </select>
            <label htmlFor="selectCategory">Selecciona una categoria:</label>
            <select
                    id="selectCategory"
                    onChange={(e) => {
                    // Actualizar la fecha seleccionada cuando cambia el valor del select
                    setSelectedCategory(e.target.value);
                    }}
                    value={selectedCategory} // Establecer el valor actual del estado para que el select refleje el estado
                >
                    {catArray.map((cat, index) => (
                    <option key={index} value={cat}>
                        {cat}
                    </option>
                    ))}
            </select>
            <label htmlFor="selectNameCategory">Selecciona un nombre categoria:</label>
            <select
                    id="selectNameCategory"
                    onChange={(e) => {
                    // Actualizar la fecha seleccionada cuando cambia el valor del select
                    setSelectedCatName(e.target.value);
                    }}
                    value={selectedCatName} // Establecer el valor actual del estado para que el select refleje el estado
                >
                    {categoriaArray.map((cat, index) => (
                <option key={index} value={cat.id}>
                    {cat.nombre}
                </option>
))}
                    
            </select>

            {/* Mostrar los ingresos filtrados en una tabla */}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Monto</th>
                    <th>Fecha Gastos</th>
                    <th>ID Categoria</th>
                    <th>SELECCIONA</th>
                    {/* ... Otros encabezados de columna */}
                </tr>

                </thead>
                <tbody>
                    {gastoFiltrado.map((gasto) => (
                        <tr key={gasto.id_gastos}>
                            <td>{gasto.id_gastos}</td>
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
                            <td>{gasto.id_categoria}</td>
                            <td>
                            {
                            //isEditing
                            editingRows[gasto.id_gastos] ? (
                                <Button className="botonGuardar" onClick={() => handleSave(gasto.id_gastos)}>Guardar</Button>
                            ) : (
                                <Button className="botonEditar" onClick={() => handleEdit(gasto.id_gastos)}>Editar</Button>
                                
                            )}
  
                        </td>

                            <td>
                                <input
                                    type="radio"
                                    name="seleccion"
                                    value={gasto.monto}
                                    checked={selectedAmount === gasto.monto}
                                    onChange={() => {
                                        setSelectedAmount(gasto.monto);
                                        setDifference(totalExpenseAmount - gasto.monto)
                                        
                                    }}
                                />
                            </td>
                            <td>
                                <Button
                                    className='botonEliminar'
                                    onClick={() => handleDelete(gasto.id_gastos)}
                                    
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                
            </table>

            <div>
                <h2> EXPENSE ACTUALIZADO</h2>
                <div>
                    <label>Total Expense Amount:</label>
                    <input type="text" value={totalExpenseAmount} readOnly />

                    <label>Símbolo:</label>
                    <input type="text" value="-" readOnly />

                    <label>Selected Amount:</label>
                    <input type="text" value={selectedAmount} readOnly />

                    <label>Diferencia:</label>
                    <input type="text" value={difference} readOnly />
                </div>
            </div>
            <TotalExpensesNew difference={difference} ></TotalExpensesNew>
            
        </div>
    );
  
    
};
  
export default EliminarGasto;