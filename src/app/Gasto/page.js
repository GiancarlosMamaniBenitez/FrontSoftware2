'use client'

import TarjetasApi from "../api_fronted/tarjetas";
import React, { useState, useEffect } from "react";
import NavBar from "@/Components/NavBar";
import "./financesGasto.css"; // Importar el archivo CSS
import CardSelect from "@/Components/CardSelect.jsx";
import TotalIncomes from "@/Components/TotalIncomes.jsx";
import TotalExpenses from "@/Components/TotalExpenses.jsx";
import TotalExpensesByCategory from "@/Components/TotalExpensesByCategory.jsx";
import RecentExpensesList from "@/Components/RecentExpensesList.jsx";
import RecentIncomesList from "@/Components/RecentIncomesList.jsx";
import SpendingAndSavings from "@/Components/SpendingAndSavings.jsx";
import ExpenseForm from "@/Components/ExpenseForm.jsx";
import IncomeForm from "@/Components/IncomeForm.jsx";
import CategoryForm from "@/Components/CategoryForm.jsx";
import IngresosApi from "../api_fronted/ingresos";
import UsuariosApi from "../api_fronted/usuarios";
import GastosApi from "../api_fronted/gastos";

import CategoriasApi from "../api_fronted/categorias";



import EliminarGasto from "@/Components/EliminarGasto.jsx"
const Finances = () => {

  

  const [selectedCard, setSelectedCard] = useState("");
  const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  const [usuariotarjeta,setUsuariotarjeta] = useState([])
  const [usuarioingresos,setUsuarioingresos] = useState([])
  const [usuariogastos,setUsuariogastos] = useState([])
  const [selectedCategorie, setSelectedCategorie] = useState("")
  const [selectedCategorieId, setSelectedCategorieId] = useState(0)
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpensesByCategory, setTotalExpensesByCategory] = useState({});
  const [recentIncomes, setRecentIncomes] = useState([]);
  const [newExpense, setNewExpense] = useState(0);
  const [expenseCategory, setExpenseCategory] = useState([]);
  const [newIncome, setNewIncome] = useState(0);
  const [newCategory, setNewCategory] = useState("");
  const [spendingLimit, setSpendingLimit] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [warning, setWarning] = useState("");
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [currentIncomesAndExpenses, setCurrentIncomesAndExpenses] = useState({
    incomes: [],
    expenses: [],
  });
  const [SelectedCard2, setSelectedCard2] = useState("")
  const [usuariocategoria,setUsuariocategoria] = useState([])
  const [listcards, setListCards] = useState([]);
  const [sesion , setSesion] = useState([]);
  const [ListaIngresos,setListaIngresos] = useState([]);
  const [listGastos, setListGastos] = useState([]);
  const [listUsuarios, setListUsuarios] = useState([]);
  const [listCategorias, setListCategorias] = useState([]);
  //importar la data de la api
  const LoadData = async() =>{
    const result = await TarjetasApi.findAll();
    const result1  = await IngresosApi.findAll();
    const result2 = await GastosApi.findAll();
    const result3 = await UsuariosApi.findAll();
    const result5 = await CategoriasApi.findAll()
    setListCategorias(result5.data)
    
    setListCards(result.data)
    setListaIngresos(result1.data)
    setListGastos(result2.data)
    setListUsuarios(result3.data)
    


  }


  

  const LoadDataId  = async () =>{
    
    const result3 = await UsuariosApi.findOne(sesion.id)
    setUsuariocategoria(result3.data.categories)
    console.log(result3.data.categories)
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




  const getCurrentIncomesAndExpenses = () => {
    if (selectedCard) {
      const card = listcards.find((e) => e.id === selectedCard);
      if (card) {
        return {
          incomes: card.incomes || [],
          expenses: card.expenses || [],
        };
      }
    }
    return { incomes: [], expenses: [] };
  };
  

  useEffect(() => {
    console.log("Lista de Ingresos cargada:", ListaIngresos);
    console.log("Lista de Gastos cargada:",listGastos);
    setCurrentIncomesAndExpenses(getCurrentIncomesAndExpenses());
  
    calculateTotalsExpenses();
    getCurrentDate();
    console.log(expenseCategory)
    
  }, [selectedCard, listcards]);

  useEffect(() => {
    //console.log("Total de Ingresos actualizado:", totalIncomes);
    //calculateTotals();
    checkSpendingLimit();
  
  }, [currentIncomesAndExpenses]);

  const checkSpendingLimit = () => {
    if (selectedCard && spendingLimit > 0) {
      const currentExpenses = currentIncomesAndExpenses.expenses;
      const totalExpensesAmount = currentExpenses.reduce(
        (total, expense) => total + expense.amount,
        0
      );

      if (totalExpensesAmount > spendingLimit) {
        setWarning("Has superado tu límite de gasto.");
      } else if (totalExpensesAmount >= spendingLimit * 0.8) {
        setWarning("Ten cuidado, estás cerca de llegar a tu límite.");
      } else {
        setWarning("");
      }
    }
  };

  
  const handleSelectedCardChange = (event) => {  
    const selectedCardData = listcards.find((e) => e.number === event.target.value);
    setSelectedCard(selectedCardData); 
    setSelectedCard2(selectedCardData.number); 
    
    if (selectedCardData) {
      setSpendingLimit(selectedCardData.spendingLimit || 0);
      setSavingsGoal(selectedCardData.savingsGoal || 0);
    }
   
    console.log(selectedCardData)
    LoadData();
  };

  const handleSelectedCategorieChange = (event) => {
    const selectedCat = listCategorias.find((e) => e.nombre === event.target.value);
    setSelectedCategorie(selectedCat.nombre); 
    setSelectedCategorieId(selectedCat.id);
    
    console.log(selectedCat)
  }
  const addNewExpense = async () => {
    const Usuario = listUsuarios.find((e) => e.id === sesion.id);
    const expenseCategory = selectedCategorieId
    if (newExpense > 0 && selectedCard && expenseCategory) {
      const card = listcards.find((e) => e.id === selectedCard.id);
        let expenses= []
        expenses = listGastos.filter((e) => e.id_tarjeta == selectedCard.id);
        const expenseID= listGastos.length + 1;
        const currentDate = getCurrentDate();
        console.log(expenseID)
        
        ;
   

      
        if (card.spendingLimit && totalExpensesByCategory[expenseCategory]) {
          const categoryExpenses = totalExpensesByCategory[expenseCategory] + newExpense;
          if (categoryExpenses > card.spendingLimit) {
            setWarning("Has superado tu límite de gasto.");
            return;
          }
        }
      

        const expense={ id_gastos: expenseID, monto: newExpense ,fecha_gastos:currentDate,id_categoria:expenseCategory , id_tarjeta: selectedCard.id}


        try {
          const response = await GastosApi.create(expense);
          await LoadData(); // Esperar a que LoadData termine antes de continuar
          setCurrentIncomesAndExpenses(getCurrentIncomesAndExpenses());
          setNewExpense(0);
          setExpenseCategory();
          setWarning("");
          //calculateTotals(); // Calcular totales después de actualizar los datos
        } catch (error) {
          console.error("Error al agregar gasto:", error);
        }

        console.log(expense)
        setCurrentIncomesAndExpenses(getCurrentIncomesAndExpenses());
        setNewExpense(0);
        setExpenseCategory();
        setWarning("");
        calculateTotalsExpenses
        LoadData();
      }
    
  };


  
  const addNewCategory = async(event) => {
    event.preventDefault();
    const categoriasUsuario = listCategorias.find((e) => e.id === sesion.id)
    
  
    
   console.log(categoriasUsuario)
    
      const categoriaNewData = {
        // Aumentamos el ID en 1
      nombre: newCategory,
      id_usuario: sesion.id,
     };
      
 
      try {
        // Realiza la solicitud POST al backend para registrar el nuevo usuario utilizando la función personasApi
        const response = await CategoriasApi.create(categoriaNewData)
        LoadData()
        // Comprueba el resultado de la solicitud
          if (response && response.status === 200) {
              // Registro exitoso, redirige a la página de inicio de sesión
              alert('Registro exitoso!');
             
          } else {
              // Manejo de errores en caso de que algo salga mal en el backend
              alert('Error al registrar usuario( no manda la data)');
          }
      } catch (error) {
       
      }
      // Limpia el campo de nueva categoría
      setNewCategory("");
    
  };
  



  const calculateTotalsExpenses=()=>{
    

    if (selectedCard && listGastos.length > 0) {
      
      const cardExpenses = listGastos.filter((expense) => expense.id_tarjeta === selectedCard.id);
      console.log("Gastos filtrados:",cardExpenses);
      
      
      const totalExpenseAmount1 = cardExpenses.reduce((total, expense) => total + parseFloat(expense.monto), 0);
      setTotalExpenseAmount(totalExpenseAmount1)

      console.log("Suma de todos los montos de gastos:", totalExpenseAmount);
    }

  };


  

  const handleSpendingLimitChange =  (event) => {
    
    const newLimit = parseFloat(event.target.value);
    setSpendingLimit(newLimit);
    
    console.log(spendingLimit)
   // const response = await TarjetasApi.update()
  };

  const handleSavingsGoalChange = (event) => {
    const newGoal = parseFloat(event.target.value);
    setSavingsGoal(newGoal);
    console.log(savingsGoal)
  };
  const handleSaveClick = async () => {
    console.log(selectedCard)
    console.log(spendingLimit)
    if (selectedCard) {
      try {
        // Actualizar los límites de gasto y metas en el objeto de tarjeta seleccionada
        const updatedCard = { ...selectedCard };

        updatedCard.spendingLimit = spendingLimit;
        updatedCard.savingGoal = savingsGoal;
        
       
        const response = await TarjetasApi.update(selectedCard.id, updatedCard);
  
        
      } catch (error) {
        console.error("Error en la solicitud de actualización:", error);
      }
    }
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  
  return (
    <div>
    <div className="centra">
        <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion} />
        <div className={`finances-container${isSidebarOpen ? '-shifted' : ''}`}>
            <div className="horizonta">
                <div className="tarjetah1">
                    <h1>Tarjetas:</h1>
                </div>
                <div className="card">
                    <CardSelect
                        selectedCard={SelectedCard2}
                        userCards={listcards.filter((e) => e.id_usuario == sesion.id)}
                        handleSelectedCardChange={handleSelectedCardChange}
                        setSpendingLimit={setSpendingLimit}
                        setSavingsGoal={setSavingsGoal}
                    />
                </div>
                {selectedCard && (
                    <div>
                        <h1>Finanzas</h1>
                        <div className="horizonta2">
                            <div className="finanza">
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
                                        hasExceededSpendingLimit={warning !== ""}
                                        warning={warning}
                                        onExpenseCategoryChange={handleSelectedCategorieChange}
                                        addNewExpense={addNewExpense}
                                    />
                                </div>
                                <div className="finanza">
                                    <SpendingAndSavings
                                        spendingLimit={spendingLimit}
                                        savingsGoal={savingsGoal}
                                        handleSpendingLimitChange={(e) => handleSpendingLimitChange(e)}
                                        handleSavingsGoalChange={(e) => handleSavingsGoalChange(e)}
                                        onSaveClick={handleSaveClick}
                                    />
                                </div>
                            </div>
                            <b></b>
                            <TotalExpenses totalExpenseAmount={totalExpenseAmount} />
                            <EliminarGasto
                                ListaGastos={[listGastos]}
                                selectedCardId={selectedCard.id}
                                listcards={listcards}
                                listCategorias={listCategorias}
                                totalExpenseAmount={totalExpenseAmount}
                            />
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
