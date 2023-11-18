import React, { useState } from 'react';
import TotalIncomesNew from './TotalIncomesNew';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import IngresosApi from "@/app/api_fronted/ingresos.js"
const EliminarIngreso = ({ ListaIngresos ,selectedCardId,totalIncomeAmount}) => {
    let fechaArray = []; // Declarar fechaArray fuera del bloque if
    let idArray = []; // Declarar idArray
    let ingresoFiltrado = [];
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedAmount, setSelectedAmount] = useState('');
    const [difference, setDifference] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [montos,setMontos]= useState({});
    const [editingRows, setEditingRows] = useState({});

    if(selectedCardId){
        // Verifica si ListaIngresos es un array
        if (!Array.isArray(ListaIngresos)) {
        //console.error('ListaIngresos no es un array:', ListaIngresos);
        return null; // O maneja el error de la manera que prefieras
        }
    
        // Aplana el array si hay arrays internos
        const ingresosAplanados = ListaIngresos.flat();
        //console.log("fechas ingresos",ingresosAplanados);
        
        //const idTarjeta = [...new Set(ingresosAplanados.map(ingreso => ingreso.id_tarjeta || ""))];
        
        idArray = Array.from(new Set(ingresosAplanados.map(ingreso=> ingreso.id_tarjeta || " ")));
        
        //console.log("idTarjeta",idTarjeta);
        //console.log("idArray ingresos",idArray);
        //const fechasUnicas = [...new Set(ingresosAplanados.map((ingreso => (ingreso.fecha_ingresos || "") && (idArray.pop() === selectedCardId))))];
        //console.log("cardId",selectedCardId);
        /*let foundElement = null;
        for (let i = 0; i < idArray.length; i++) {
        if (idArray[i] === selectedCardId) {
            foundElement = idArray[i];
            break; // Termina el bucle si se encuentra el elemento
        }
        }*/
        //console.log("foudnElement",foundElement);
        fechaArray = Array.from(new Set(ingresosAplanados.filter(ingreso => ingreso.id_tarjeta === selectedCardId).map(ingreso => (ingreso.fecha_ingresos || " ")  )));


        //console.log("selectedCard",selectedCardId);
        
    
    
    
        //console.log("fechaArray", fechaArray);
            // Filtrar los ingresos por fecha y tarjeta
        //const ingresosFiltrados = ingresosAplanados.filter(
            //(ingreso) => (ingreso.fecha_ingresos || '') === selectedDate && ingreso.id_tarjeta === selectedCardId
        //);
        //console.log("selected date",selectedDate);
        ingresoFiltrado = Array.from(new Set(ingresosAplanados.filter(ingreso => ingreso.id_tarjeta === selectedCardId && ingreso.fecha_ingresos===selectedDate)));
        //console.log("ingresos filtrados",ingresoFiltrado);

        console.log("selectedCardId", selectedCardId);
console.log("selectedDate", selectedDate);
console.log("ingresosAplanados", ingresosAplanados);
console.log("ingresoFiltrado", ingresoFiltrado);

    }
    const calculateTotalSelectedAmount = (selectedItems) => {
        return selectedItems.reduce((total, item) => total + parseFloat(item), 0);
    };

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
            [ingresoId]: prevMontos[ingresoId] !== undefined ? prevMontos[ingresoId] : ingreso.monto,
        }));

        try {
            // Aquí deberías llamar a tu API para actualizar el monto en la base de datos
            // Puedes usar fetch o axios, por ejemplo
            const response = await IngresosApi.update(ingresoId, { monto: montos[ingresoId] })
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
            const response = await IngresosApi.remove(ingresoId);
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

    const handleOnLoadAct = async () =>{
        const result = await IngresosApi.findAll()
       // const resultData = await IngresosApi.findOne(ingreso.id_ingresos)
        //setIngresos(result.data)
      }

    // Elimina la clave asociada al id_ingresos del estado montos
    
    
    

    return (
        <div>
        <h2>Ingresos en Array</h2>
        <label htmlFor="selectFecha">Selecciona una fecha:</label>
        <select
            id="selectFecha"
            onChange={(e) => {
                setSelectedDate(e.target.value);
            }}
            value={selectedDate}
        >
            {fechaArray.map((fecha, index) => (
                <option key={index} value={fecha}>
                    {fecha}
                </option>
            ))}
        </select>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Monto</th>
                </tr>
            </thead>
            
            <tbody>
                {ingresoFiltrado.map((ingreso, index) => (
                    <tr key={ingreso.id_ingresos}>
                        <td>
                            <fieldset>
                                <Form.Control
                                    id={`disabledIdInput_${ingreso.id_ingresos}`}
                                    plaintext
                                    readOnly
                                    defaultValue={
                                        ingreso.id_ingresos}
                                />
                            </fieldset>
                        </td>
                        <td>
                            <fieldset>
                                {
                                //isEditing
                                editingRows[ingreso.id_ingresos]  ? (
                                    <div>
                                        <input
                                            id={`disabledMontoInput_${ingreso.id_ingresos}`}
                                            type="text"
                                            placeholder="Editable input"
                                            value={
                                                //ingreso.monto
                                                //monto
                                               /* montos[ingreso.id_ingresos] !== undefined
                                                ? montos[ingreso.id_ingresos]
                                                : ingreso.monto*/
                                                montos[ingreso.id_ingresos] || ingreso.monto

                                                
                                            }
                                            onChange={(e) => {
                                                console.log("Nuevo valor de monto:", e.target.value);
                                                //setMonto(e.target.value);
                                                
                                                /*setDifference(
                                                    totalIncomeAmount - calculateTotalSelectedAmount(selectedItems)
                                                );*/
                                                setMontos({
                                                    ...montos,
                                                    [ingreso.id_ingresos]: e.target.value,
                                                  });
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
                        
                        <td>
                            {
                            //isEditing
                            editingRows[ingreso.id_ingresos] ? (
                                <Button className="botonGuardar" onClick={() => handleSave(ingreso.id_ingresos)}>Guardar</Button>
                            ) : (
                                <Button className="botonEditar" onClick={() => handleEdit(ingreso.id_ingresos)}>Editar</Button>
                                
                            )}
  
                        </td>

                        <td>
                        <Form.Check
                            inline
                            type="checkbox"
                            name="seleccion"
                            value={montos[ingreso.id_ingresos] || ingreso.monto}
                            checked={selectedItems.includes(montos[ingreso.id_ingresos] || ingreso.monto)}
                            onChange={() => {
                                const updatedItems = [...selectedItems];
                                const montoToCheck = montos[ingreso.id_ingresos] || ingreso.monto;
                                const index = updatedItems.indexOf(montoToCheck);

                                if (index !== -1) {
                                    updatedItems.splice(index, 1);
                                } else {
                                    updatedItems.push(montoToCheck);
                                }
                                setSelectedItems(updatedItems);
                                setDifference(totalIncomeAmount - calculateTotalSelectedAmount(updatedItems));
                            }}
                        />
                        
                        
                    </td>
                    <td>
                        <Button
                            className='botonEliminar'
                            onClick={() => handleDelete(ingreso.id_ingresos)}
                            
                        >
                            Eliminar
                        </Button>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div>
            <h2> INCOME ACTUALIZADO</h2>
            <div>
                <label>Selected Amount:</label>
                <Form.Control
                    type="text"
                    value={selectedItems.join(', ')}
                    readOnly
                />

                <label>Diferencia:</label>
                <Form.Control
                    type="text"
                    value={totalIncomeAmount - calculateTotalSelectedAmount(selectedItems)}
                    readOnly
                />
            </div>
        </div>
        <TotalIncomesNew difference={difference}></TotalIncomesNew>
    </div>
);
  };
  
  export default EliminarIngreso;