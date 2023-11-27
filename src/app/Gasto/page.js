'use client'

import Link from 'next/link';

import TarjetasApi from "../api_fronted/tarjetas";
import React, { useState, useEffect } from "react";
import NavBar from "@/Components/NavBar";
import "./financesGasto.css"; // Importar el archivo CSS
import CardSelect from "@/Components/CardSelect.jsx";
import TotalExpenses from "@/Components/TotalExpenses.jsx";
import ExpenseForm from "@/Components/ExpenseForm.jsx";
import CategoryForm from "@/Components/CategoryForm.jsx";
import GastosApi from "../api_fronted/gastos";
import CategoriasApi from "../api_fronted/categorias";
//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import EliminarGasto from "@/Components/EliminarGasto.jsx"
import LimitgastoApi from '../api_fronted/Limitgasto';
import LimiteGasto from '@/Components/LimiteGasto';
const Finances = () => {
  const [selectedCard, setSelectedCard] = useState("");
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);

  const [selectedCategorie, setSelectedCategorie] = useState("")
  const [selectedCategorieId, setSelectedCategorieId] = useState(0)

  const [newExpense, setNewExpense] = useState(0);
  const [expenseCategory, setExpenseCategory] = useState([]);

  const [newCategory, setNewCategory] = useState("");
  const [spendingLimit, setSpendingLimit] = useState(0);
  const [spendingLimitFound, setSpendingLimitFound] = useState(false)
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [SelectedCard2, setSelectedCard2] = useState("")
  const [estadoBoton, setEstadoBoton] = useState("Establecer limite")
  const [listcards, setListCards] = useState([]);
  const [sesion, setSesion] = useState([]);
  const [listGastos, setListGastos] = useState([]);
  const [listCategorias, setListCategorias] = useState([]);

  const [listLimit, setListLimit] = useState([]);
  //importar la data de la api
  const LoadData = async () => {
    const result = await TarjetasApi.findAll();
    const result2 = await GastosApi.findAll();
    const result5 = await CategoriasApi.findAll()
    const result6 = await LimitgastoApi.findAll()
    
    setListLimit(result6.data)
    setListCategorias(result5.data)
 
    setListCards(result.data)
    setListGastos(result2.data)


  }



  const notifyError = (mensaje) => {
    toast.error( mensaje ,{
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }

  const notifySuccess = (mensaje) => {
    toast.success(mensaje , {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  const LoadOnlyCategorias = async () => {

    const result3 = await CategoriasApi.findAll()
    setListCategorias(result3.data)
    
  }
  /*
  
  */
  //almacenar la sesion en la variable sesion
  const handleOnLoad = () => {

    var sesionGuardada = localStorage.getItem("sesion");
    setSesion(JSON.parse(sesionGuardada))
    console.log(sesionGuardada.id)

  }

  // para que lo renderice apenas carga la pagina 
  useEffect(() => {

    handleOnLoad();
    LoadData()




    //tarjetaLocal();

  }, []);

  //  obtener fecha
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  useEffect(() => {

    calculateTotalsExpenses();
    getCurrentDate();

  }, [selectedCard, listcards]);

  useEffect(() => {
    //console.log("Total de Ingresos actualizado:", totalIncomes);
    //calculateTotals();
    checkSpendingLimit();
  
  }, [totalExpenseAmount]);

  const checkSpendingLimit = () => {
   
      if (totalExpenseAmount > spendingLimit && spendingLimit != 0) {
        const mensaje = "Has superado tu límite de gasto 😣"
        notifyError(mensaje)
        return
      } else if (totalExpenseAmount > spendingLimit*0.8 && totalExpenseAmount < spendingLimit) {
        const mensaje = "Ten cuidado, estás cerca de llegar a tu límite."
        notifyError(mensaje)
        return
      } else if (totalExpenseAmount == spendingLimit){
        
      }

      else {
        const mensaje = "Añade tus gastos 😉"
        notifySuccess(mensaje)
        return
      }
      LoadData()
      
    
  };


  const handleSelectedCardChange = (event) => {
    
    const selectedCardData = listcards.find((e) => e.number === event.target.value);
    setSelectedCard(selectedCardData);
    setSelectedCard2(selectedCardData.number);

    if (selectedCardData) {
      const limit = listLimit.find((e) => e.id_usuario === sesion.id)
      if (limit) {
        console.log(" se encuentra")
        setSpendingLimit(limit.monto);
        setSpendingLimitFound(true)
        
      }else{
        console.log("no se encuentra el monto")
      }
      
    }
    LoadData();
    
  };

  const handleSelectedCategorieChange = (event) => {
    const selectedCat = listCategorias.find((e) => e.nombre === event.target.value);
    setSelectedCategorie(selectedCat.nombre);
    setSelectedCategorieId(selectedCat.id);

  }
  const addNewExpense = async () => {
    const expenseCategory = selectedCategorieId
    if (newExpense > 0 && selectedCard && expenseCategory) {
      if (totalExpenseAmount>spendingLimit) {
        const mensaje = "Ya no puedes añadir más gastos"
        notifyError(mensaje)
        return
      }
      const expenseID = listGastos.length + 1;
      const currentDate = getCurrentDate();
      
      const gastoConIDMasAlto = listGastos.reduce((gastoMax, gastoActual) => {
        return gastoActual.id_gastos > (gastoMax ? gastoMax.id_gastos : 0) ? gastoActual : gastoMax;
      }, null);
      const nuevoId = gastoConIDMasAlto ? gastoConIDMasAlto.id + 1 : 1;

      const expense = { id_gastos: nuevoId, monto: newExpense, fecha_gastos: currentDate, id_categoria: expenseCategory, id_tarjeta: selectedCard.id }
      console.log(expense)

      try {
        const response = await GastosApi.create(expense);
        setListGastos([...listGastos, response.data]);
        const mensaje = "Se añadió el gasto"
        notifySuccess(mensaje)
        LoadData(); // Esperar a que LoadData termine antes de continuar
        
        setNewExpense(0);
        setExpenseCategory();
        calculateTotalsExpenses()
        
        //calculateTotals(); // Calcular totales después de actualizar los datos
      } catch (error) {
        console.error("Error al agregar gasto:", error);
      }
      setNewExpense(0);
      setExpenseCategory();
      
      calculateTotalsExpenses()
      
    }

  };



  const addNewCategory = async (event) => {
    event.preventDefault();
    const categoriasUsuario = listCategorias.find((e) => e.id === sesion.id)
    const categoriaNewData = {
      // Aumentamos el ID en 1
      nombre: newCategory,
      id_usuario: sesion.id,
    };


    try {
      // Realiza la solicitud POST al backend para registrar el nuevo usuario utilizando la función personasApi
      const response = await CategoriasApi.create(categoriaNewData)
      LoadOnlyCategorias()
      // Comprueba el resultado de la solicitud
      if (response && response.status === 200) {
        // Registro exitoso, redirige a la página de inicio de sesión
        const mensaje = "Categoria agregada"
        notifySuccess(mensaje)

      } else {
        // Manejo de errores en caso de que algo salga mal en el backend
        alert('Error al registrar usuario( no manda la data)');
      }
    } catch (error) {

    }
    // Limpia el campo de nueva categoría
    setNewCategory("");

  };




  const calculateTotalsExpenses = () => {


    if (selectedCard && listGastos.length > 0) {

      const cardExpenses = listGastos.filter((expense) => expense.id_tarjeta === selectedCard.id);
      console.log("Gastos filtrados:", cardExpenses);


      const totalExpenseAmount1 = cardExpenses.reduce((total, expense) => total + parseFloat(expense.monto), 0);
      console.log("total", totalExpenseAmount1)
      setTotalExpenseAmount(totalExpenseAmount1)
      
    }

  };




  const handleSpendingLimitChange = (event) => {

    const newLimit = parseFloat(event.target.value);
    setSpendingLimit(newLimit);

  };

  const handleSaveClick = async () => {
    const userId = sesion.id
    if (selectedCard) {
      if (spendingLimitFound === false) {
        try {
          // Actualizar los límites de gasto y metas en el objeto de tarjeta seleccionada
      
          const limitData = {
            monto: spendingLimit,
            id_usuario: userId
          }
            const response3 = await LimitgastoApi.create(limitData)
            const mensaje = "Se definió el limite"
            notifySuccess(mensaje)  
            
  
        } catch (error) {
          console.error("Error en la solicitud de actualización:", error);
        }
      }else if (spendingLimitFound === true) {
        const limitData = {
          monto: spendingLimit,
          id_usuario: userId
        }
          const limit = listLimit.find((e)=> e.id_usuario === userId)
          const response3 = await LimitgastoApi.update(limit.id, limitData)
          LoadData() 
          const mensaje = "Se actualizó el límite"
          notifySuccess(mensaje)
          setEstadoBoton("Actualizar limite")
      }
      
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return (
    <div>

      <div className="">
        <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion} />
        <ToastContainer></ToastContainer>
        <div className={`finances-container${isSidebarOpen ? '-shifted' : ''}`}>
          <div className="">
            <div className="tarjetah1">
              <h1>Tarjetas:</h1>
            </div>
            <div className=''>
              <CardSelect
                selectedCard={SelectedCard2}
                userCards={listcards.filter((e) => e.id_usuario == sesion.id)}
                handleSelectedCardChange={handleSelectedCardChange}
          
                className={"form-select"}
              />
            </div>
            {selectedCard && (
              <div>
                <div className="horizonta2">
                  <div className="finanza">
                    <div className="finanza">
                      <TotalExpenses totalExpenseAmount={totalExpenseAmount} />
                    </div>
                    <div className="finanza">
                      <LimiteGasto
                        Limit={spendingLimit}
                        estadoBoton = {estadoBoton}
                        handleLimitChange={(e) => handleSpendingLimitChange(e)}
                        onSaveClick={handleSaveClick}
                      />
                    </div>
                    <div className="finanza">
                      <CategoryForm
                        newCategory={newCategory}
                        onNewCategoryChange={(e) => setNewCategory(e.target.value)}
                        addNewCategory={addNewCategory}
                      />
                    </div>
                    <div className="finanza">
                      <ExpenseForm
                        newExpense={newExpense}
                        selectedCat={selectedCategorie}
                        onNewExpenseChange={(e) => setNewExpense(parseFloat(e.target.value))}
                        expenseCategory={listCategorias.filter((e) => e.id_usuario == sesion.id)}
                       
                        onExpenseCategoryChange={handleSelectedCategorieChange}
                        addNewExpense={addNewExpense}
                      />
                    </div>
            
                   
                  </div>


                  <div className='finanza'>
                    <EliminarGasto
                      ListaGastos={[listGastos]}
                      selectedCardId={selectedCard.id}
                      listcards={listcards}
                      listCategorias={listCategorias}
                      totalExpenseAmount={totalExpenseAmount}
                      sesionId={sesion.id}
                    /></div>


                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Finances;
