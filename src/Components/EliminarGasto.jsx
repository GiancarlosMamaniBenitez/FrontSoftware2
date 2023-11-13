import React, { useState, useEffect  } from 'react';
import TotalExpensesNew from './TotalExpensesNew';
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
                            <td>{gasto.monto}</td>
                            <td>{gasto.fecha_gastos}</td>
                            <td>{gasto.id_categoria}</td>

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