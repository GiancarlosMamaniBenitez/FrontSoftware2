import React, { useState } from 'react';
import TotalIncomesNew from './TotalIncomesNew';
const EliminarIngreso = ({ ListaIngresos ,selectedCardId,totalIncomeAmount}) => {
    let fechaArray = []; // Declarar fechaArray fuera del bloque if
    let idArray = []; // Declarar idArray
    let ingresoFiltrado = [];
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedAmount, setSelectedAmount] = useState('');
    const [difference, setDifference] = useState(0);

    if(selectedCardId){
        // Verifica si ListaIngresos es un array
        if (!Array.isArray(ListaIngresos)) {
        console.error('ListaIngresos no es un array:', ListaIngresos);
        return null; // O maneja el error de la manera que prefieras
        }
    
        // Aplana el array si hay arrays internos
        const ingresosAplanados = ListaIngresos.flat();
        console.log("fechas ingresos",ingresosAplanados);
        
        //const idTarjeta = [...new Set(ingresosAplanados.map(ingreso => ingreso.id_tarjeta || ""))];
        
        idArray = Array.from(new Set(ingresosAplanados.map(ingreso=> ingreso.id_tarjeta || " ")));
        
        //console.log("idTarjeta",idTarjeta);
        console.log("idArray ingresos",idArray);
        //const fechasUnicas = [...new Set(ingresosAplanados.map((ingreso => (ingreso.fecha_ingresos || "") && (idArray.pop() === selectedCardId))))];
        console.log("cardId",selectedCardId);
        let foundElement = null;
        for (let i = 0; i < idArray.length; i++) {
        if (idArray[i] === selectedCardId) {
            foundElement = idArray[i];
            break; // Termina el bucle si se encuentra el elemento
        }
        }
        console.log("foudnElement",foundElement);
        fechaArray = Array.from(new Set(ingresosAplanados.filter(ingreso => ingreso.id_tarjeta === selectedCardId).map(ingreso => (ingreso.fecha_ingresos || " ")  )));


        console.log("selectedCard",selectedCardId);
        
    
    
    
        console.log("fechaArray", fechaArray);
            // Filtrar los ingresos por fecha y tarjeta
        //const ingresosFiltrados = ingresosAplanados.filter(
            //(ingreso) => (ingreso.fecha_ingresos || '') === selectedDate && ingreso.id_tarjeta === selectedCardId
        //);
        console.log("selected date",selectedDate);
        ingresoFiltrado = Array.from(new Set(ingresosAplanados.filter(ingreso => ingreso.id_tarjeta === selectedCardId && ingreso.fecha_ingresos===selectedDate)));
        console.log("ingresos filtrados",ingresoFiltrado);

    }
    

    return (
      <div>
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
                {fechaArray.map((fecha, index) => (
                <option key={index} value={fecha}>
                    {fecha}
                </option>
                ))}
        </select>

        {/* Mostrar los ingresos filtrados en una tabla */}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Monto</th>
                    {/* ... Otros encabezados de columna */}
                </tr>
                </thead>
                <tbody>
                {ingresoFiltrado.map((ingreso) => (
                    <tr key={ingreso.id_ingresos}>
                    <td>{ingreso.id_ingresos}</td>
                    <td>{ingreso.monto}</td>
                    
                    <td>
                        <input
                            type="radio"
                            name="seleccion"
                            value={ingreso.monto}
                            checked={selectedAmount === ingreso.monto}
                            onChange={() => {
                                setSelectedAmount(ingreso.monto);
                                setDifference(totalIncomeAmount - ingreso.monto)                        
                        }}
                        />
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            
            <div>
                <h2> INCOME ACTUALIZADO</h2>
                <div>
                    <label>Total Income Amount:</label>
                    <input type="text" value={totalIncomeAmount} readOnly />

                    <label>Símbolo:</label>
                    <input type="text" value="-" readOnly />

                    <label>Selected Amount:</label>
                    <input type="text" value={selectedAmount} readOnly />

                    <label>Diferencia:</label>
                    <input type="text" value={difference} readOnly />
                </div>
            </div>
            <TotalIncomesNew difference={difference} ></TotalIncomesNew>
      </div>
    );
  };
  
  export default EliminarIngreso;